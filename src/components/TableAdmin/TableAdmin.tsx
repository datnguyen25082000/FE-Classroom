import React, { useRef } from "react";
import { useTable, usePagination } from "react-table";
import "./TableAdmin.scss";
import BTable from "react-bootstrap/Table";
import {
  AiOutlineDoubleRight,
  AiOutlineDoubleLeft,
  AiOutlineLeft,
  AiOutlineRight,
} from "react-icons/ai";
import { FiMoreVertical } from "react-icons/fi";
import { Popover, OverlayTrigger, Button, Modal } from "react-bootstrap";

const EditableCell = ({
  value: initialValue,
  row: { index },
  column: { id, isFinalized, isStudent },
  updateMyData,
  updateStatusStudent,
}: any) => {
  const [value, setValue] = React.useState(initialValue);
  const onChange = (e: any) => {
    setValue(e.target.value);
  };

  const onBlur = () => {
    updateMyData(index, id, value);
  };

  React.useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  // const popover = (
  //   <Popover
  //     id="popover-basic"
  //     // style={{ display: showOverlay ? "block" : "none" }}
  //   >
  //     <Popover.Header as="h3">Tùy chọn</Popover.Header>
  //     <Popover.Body>
  //       <div className="card-student__item" onClick={() => {}}>
  //         <span>Hoàn tất cột điểm</span>
  //       </div>
  //     </Popover.Body>
  //   </Popover>
  // );

  return <span>{value}</span>;
};

const defaultColumn = {
  Cell: EditableCell,
};

export const TableAdmin: React.FC<ITable> = ({
  columns,
  data,
  updateMyData,
  skipPageReset,
  updateStatusStudent,
  handleImportColumn,
  handleFinalizeColumn,
  handleSaveData,
  isStudentTable = false,
  handleReviewStudent,
}) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      defaultColumn,
      autoResetPage: !skipPageReset,
      updateMyData,
      updateStatusStudent,
    },
    usePagination
  );

  return (
    <div className="table-admin">
      <div className="tableWrap">
        <BTable bordered hover size="sm" {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column: any) => (
                  <th
                    {...column.getHeaderProps({
                      className: column.collapse
                        ? "collapse1"
                        : column.classname,
                    })}
                  >
                    {column.isTotal ? (
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          fontWeight: column.isFinalized ? "bold" : "normal",
                        }}
                      >
                        {column.render("Header")}
                      </div>
                    ) : column.Header === "none" ? (
                      <></>
                    ) : (
                      column.render("Header")
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row: any, i: any) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell: any) => {
                    return (
                      <td
                        {...cell.getCellProps({
                          className: cell.column.collapse
                            ? "collapse1"
                            : cell.column.classname,
                        })}
                      >
                        {cell.render("Cell")}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </BTable>

        <div
          className="pagination"
          style={{ display: isStudentTable ? "none" : "" }}
        >
          <button
            style={{ marginRight: "8px" }}
            onClick={() => gotoPage(0)}
            disabled={!canPreviousPage}
          >
            <AiOutlineDoubleLeft size={20} />
          </button>
          {"  "}
          <button
            style={{ marginRight: "8px" }}
            onClick={() => previousPage()}
            disabled={!canPreviousPage}
          >
            <AiOutlineLeft size={20} />
          </button>
          {"  "}
          <button
            style={{ marginRight: "8px" }}
            onClick={() => nextPage()}
            disabled={!canNextPage}
          >
            <AiOutlineRight size={20} />
          </button>
          {"  "}
          <button
            style={{ marginRight: "8px" }}
            onClick={() => gotoPage(pageCount - 1)}
            disabled={!canNextPage}
          >
            <AiOutlineDoubleRight size={20} />
          </button>
          {"  "}
          <span
            style={{ display: "flex", alignItems: "center", margin: "0px 5px" }}
          >
            Trang{" "}
            <strong>
              {pageIndex + 1} / {pageOptions.length}
            </strong>{" "}
          </span>
          <span>
            | Đến trang:{" "}
            <input
              type="number"
              defaultValue={pageIndex + 1}
              onChange={(e) => {
                const page = e.target.value ? Number(e.target.value) - 1 : 0;
                gotoPage(page);
              }}
              style={{ width: "100px" }}
            />
          </span>{" "}
          <select
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
            }}
          >
            {[10, 20, 30, 40, 50].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                Hiện {pageSize}
              </option>
            ))}
          </select>
          {/* <Button
            className="room-score__button ml-auto"
            variant="outline-success"
            style={{ position: "absolute", right: 50 }}
            onClick={handleSaveData}
          >
            Lưu thay đổi
          </Button> */}
        </div>
      </div>
    </div>
  );
};

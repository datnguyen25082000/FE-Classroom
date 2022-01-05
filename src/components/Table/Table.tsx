import React, { useRef } from "react";
import { useTable, usePagination } from "react-table";
import "./Table.scss";
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

  const popover = (
    <Popover
      id="popover-basic"
      // style={{ display: showOverlay ? "block" : "none" }}
    >
      <Popover.Header as="h3">Tùy chọn</Popover.Header>
      <Popover.Body>
        <div className="card-student__item" onClick={() => {}}>
          <span>Hoàn tất cột điểm</span>
        </div>
      </Popover.Body>
    </Popover>
  );

  if (id === "fullname") {
    return <div style={{ width: "200px" }}>{value}</div>;
  }

  if (id === "studentid") {
    return <div style={{ width: "100px" }}>{value}</div>;
  }

  if (id === "none") {
    return <div></div>;
  }

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <input
        style={{ width: "50px", outline: "none" }}
        value={value}
        type="number"
        disabled={id === "total" || isStudent}
        min={0}
        max={100}
        onChange={onChange}
        onBlur={onBlur}
      />
      <span style={{ width: "50px" }}>/ 100</span>

      {/* {id === "total" && (
        <OverlayTrigger
          trigger="click"
          placement="bottom"
          overlay={popover}
          rootClose
        >
          <div className="table__fimore">{<FiMoreVertical size={20} />}</div>
        </OverlayTrigger>
      )} */}
    </div>
  );
};

const defaultColumn = {
  Cell: EditableCell,
};

export const Table: React.FC<ITable> = ({
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

  const popover1 = (column: any) => {
    return (
      <Popover id="popover-trigger-focus" title="Popover bottom">
        <Popover.Header as="h3">Tùy chọn</Popover.Header>
        <Popover.Body>
          {column.isStudent ? (
            <div
              className="card-student__item"
              onClick={() => handleReviewStudent(column)}
            >
              <span>Xem / gửi phúc khảo </span>
            </div>
          ) : column.id === "total" ? (
            <div
              className="card-student__item"
              onClick={() => handleFinalizeColumn(column)}
            >
              <span>Hoàn tất và trả điểm cả lớp</span>
            </div>
          ) : (
            <>
              <div
                className="card-student__item"
                onClick={() => handleImportColumn(column)}
              >
                <span> Nhập file điểm</span>
              </div>
              <div
                className="card-student__item"
                onClick={() => handleFinalizeColumn(column)}
              >
                {column.isFinalized ? (
                  <span>Hủy hoàn tất</span>
                ) : (
                  <span>Hoàn tất</span>
                )}
              </div>
            </>
          )}
        </Popover.Body>
      </Popover>
    );
  };

  return (
    <div className="table">
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
                        <OverlayTrigger
                          trigger="focus"
                          placement="bottom"
                          overlay={popover1(column)}
                        >
                          <Button
                            style={{
                              background: "none",
                              border: "none",
                              padding: 0,
                            }}
                          >
                            <div className="table__fimore">
                              {<FiMoreVertical size={20} />}
                            </div>
                          </Button>
                        </OverlayTrigger>
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
          <Button
            className="room-score__button ml-auto"
            variant="outline-success"
            style={{ position: "absolute", right: 50 }}
            onClick={handleSaveData}
          >
            Lưu thay đổi
          </Button>
        </div>
      </div>
    </div>
  );
};

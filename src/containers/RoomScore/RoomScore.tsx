import React, { useState, useEffect, useMemo, useRef } from "react";
import { useParams } from "react-router";
import { HeaderRoom, Page404 } from "../../components/common";
import { OffCanvas, Table } from "../../components";
import {
  useAppSelector,
  useAppDispatch,
  useFetchOneCourseQuery,
  doGetAllAssignByCourse,
} from "../../redux";
import "./RoomScore.scss";
import { Button } from "react-bootstrap";
import { makeData } from "./MakeData";
import { CSVLink } from "react-csv";
import { useHistory } from "react-router-dom";

export const RoomScore = () => {
  const dispatch = useAppDispatch();
  const refInputScoreList = useRef<any>(null);
  const refInputStudentList = useRef<any>(null);
  const history = useHistory();
  const { classId } = useParams<{ classId: string }>();
  const [showCanvas, setShowCanvas] = useState(false);
  const oneCourse = useFetchOneCourseQuery({ courseId: classId }).data;
  const { listAssign } = useAppSelector((state) => state.assignCateSlice);

  const [data, setData] = useState(() => makeData(20));
  const [originalData] = useState(data);
  const [skipPageReset, setSkipPageReset] = useState(false);

  useEffect(() => {
    dispatch(doGetAllAssignByCourse({ course_id: classId }));
  }, [classId]);


  // data export template data
  const header1 = [
    { label: "Họ và tên", key: "fullname" },
    { label: "Mã số học viên", key: "studentid" },
  ];

  // data export template grade
  const header2 = useMemo(() => {
    let array = [{ label: "Mã số sinh viên", key: "studentid" }];

    if (listAssign && listAssign.length) {
      listAssign.forEach((element) => {
        array.push({ label: element.name, key: element.name });
      });
    }
    return array;
  }, [listAssign]);

  // data export grade
  const header3 = useMemo(() => {
    let array = [
      { label: "Họ và tên", key: "fullname" },
      { label: "Mã số học viên", key: "studentid" },
      { label: "Điểm tổng kết", key: "total" },
    ];

    if (listAssign && listAssign.length) {
      listAssign.forEach((element) => {
        array.push({ label: element.name, key: element.name });
      });
    }
    return array;
  }, [listAssign]);

  const data3 = useMemo(() => {
    return [];
  }, []);

  // set column of table score
  const columns = useMemo(() => {
    let arrayHeader: any = [
      {
        Header: "Thông tin học viên",
        columns: [
          {
            Header: "Họ và tên",
            accessor: "fullname",
            collapse: false,
          },
          {
            Header: "Mã số sinh viên",
            accessor: "studentid",
            collapse: false,
          },
        ],
      },
      {
        Header: "Điểm số",
        columns: [
          {
            Header: "Tổng điểm",
            accessor: "total",
            collapse: true,
            isTotal: true,
          },
        ],
      },
      {
        Header: "none",
        columns: [
          {
            Header: "none",
            accessor: "none",
            collapse: true,
          },
        ],
      },
    ];

    if (listAssign && listAssign.length) {
      listAssign.forEach((element, i) => {
        const a = {
          Header: element.name,
          accessor: element.name,
          collapse: true,
        };
        arrayHeader[1].columns.push(a);
      });
    }

    return arrayHeader;
  }, [listAssign]);

  useEffect(() => {
    setSkipPageReset(false);
  }, [data]);

  const updateMyData = (rowIndex: any, columnId: any, value: any) => {
    setSkipPageReset(true);
    setData((old: any) =>
      old.map((row: any, index: any) => {
        if (index === rowIndex) {
          return {
            ...old[rowIndex],
            [columnId]: value,
          };
        }
        return row;
      })
    );
  };

  const updateStatusStudent = (rowIndex: any, value: any) => {
    console.log("haha", rowIndex);
  };

  const handleExportTemplateData = () => {};

  const handleExportTemplateScore = () => {};

  const handleExportData = () => {};

  const handleScoreListUploaded = (e: any) => {
    const file = e.target.files[0]
    
  };

  const handleStudentListUploaded = (e: any) => {
    const file = e.target.files[0]
  }

  const handleStudentListImportClicked = () => {
    if (refInputStudentList) {
      refInputStudentList.current.click()
    }
  }

  const handleScoreListImportClicked = () => {
    if (refInputScoreList) {
      refInputScoreList.current.click()
    }
  }

  if (!oneCourse || !oneCourse.course_id) {
    return <Page404 />;
  }

  return (
    <div className="room-score">
      <HeaderRoom
        classId={classId}
        handleAction1={() => setShowCanvas(true)}
        className={oneCourse.course_name}
      />

      <>
        <input
          type="file"
          style={{ display: "none" }}
          ref={refInputScoreList}
          accept=".csv,.xlsx"
          onChange={e => handleScoreListUploaded(e)}
        />
        <input
          type="file"
          style={{ display: "none" }}
          ref={refInputStudentList}
          accept=".csv,.xlsx"
          onChange={e => handleStudentListUploaded(e)}
        />

        <div
          className="room-score__groupBtn"
          style={{ justifyContent: "flex-end" }}
        >
          <CSVLink
            data={data3}
            headers={header3}
            filename={"classroom-score.csv"}
          >
            <Button
              className="room-score__button"
              variant="outline-success"
              onClick={handleExportData}
            >
              Xuất bảng điểm excel
            </Button>{" "}
          </CSVLink>
          <Button
            className="room-score__button"
            variant="outline-success"
            onClick={() =>
              history.push(`/classroom/${classId}/grading-structure`)
            }
          >
            Thay đổi cấu trúc tính điểm
          </Button>
        </div>

        <div
          className="room-score__groupBtn"
          style={{ justifyContent: "flex-end" }}
        >
          <CSVLink
            data={[]}
            headers={header1}
            filename={"classroom-template-data.csv"}
          >
            <Button
              className="room-score__button"
              variant="outline-primary"
              onClick={handleExportTemplateData}
            >
              Tải mẫu danh sách học viên
            </Button>
          </CSVLink>
          <CSVLink
            data={[]}
            headers={header2}
            filename={"classroom-template-grade.csv"}
          >
            <Button
              className="room-score__button"
              variant="outline-primary"
              onClick={handleExportTemplateScore}
            >
              Tải mẫu danh sách điểm
            </Button>
          </CSVLink>

          <Button
            className="room-score__button"
            variant="outline-dark"
            onClick={handleStudentListImportClicked}
          >
            Nhập dữ liệu danh sách học viên(csv)
          </Button>
          <Button
            className="room-score__button"
            variant="outline-dark"
            onClick={handleScoreListImportClicked}
          >
            Nhập dữ liệu danh sách điểm(csv)
          </Button>
        </div>

        <Table
          columns={columns}
          data={data}
          updateMyData={updateMyData}
          skipPageReset={skipPageReset}
          updateStatusStudent={updateStatusStudent}
        />
      </>

      <OffCanvas
        show={showCanvas}
        setShow={setShowCanvas}
        handleClose={() => setShowCanvas(false)}
      />
    </div>
  );
};

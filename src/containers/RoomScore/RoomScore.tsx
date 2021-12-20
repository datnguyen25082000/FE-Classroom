import React, { useState, useEffect, useMemo, useRef } from "react";
import { useParams } from "react-router";
import { HeaderRoom, Page404 } from "../../components/common";
import { OffCanvas, Table } from "../../components";
import {
  useAppSelector,
  useAppDispatch,
  useFetchOneCourseQuery,
  doGetAllAssignByCourse,
  doAddScoreAssignmentCate,
  doAddStudentsToCourse,
  doGetAllStudentOfCourse,
  doGetAllScoreOfCourse,
  doFinalizeAssignment,
} from "../../redux";
import "./RoomScore.scss";
import { Button } from "react-bootstrap";
import { makeData } from "./MakeData";
import { CSVLink } from "react-csv";
import { useHistory } from "react-router-dom";
import xlsx from "xlsx";

export const RoomScore = () => {
  const dispatch = useAppDispatch();
  const refInputScoreList = useRef<any>(null);
  const refInputStudentList = useRef<any>(null);
  const history = useHistory();
  const { classId } = useParams<{ classId: string }>();
  const [showCanvas, setShowCanvas] = useState(false);
  const oneCourse = useFetchOneCourseQuery({ courseId: classId }).data;
  const { listAssign } = useAppSelector((state) => state.assignCateSlice);
  const { listScore } = useAppSelector((state) => state.scoreSlice);

  const [skipPageReset, setSkipPageReset] = useState(false);
  const [colFocus, setColFocus] = useState(0);

  const [data, setData] = useState(() => makeData(listScore, listAssign));
  const [originalData] = useState(data);

  // header and data of export template input student
  const studentListHeader = [
    { label: "Mã số sinh viên", key: "studentId" },
    { label: "Họ và tên", key: "fullName" },
  ];

  // header and data of export template col score
  const scoreListHeader = [
    { label: "Mã số sinh viên", key: "studentId" },
    { label: "Điểm", key: "score" },
  ];

  const scoreListData = useMemo(() => {
    let data: any = [];

    if (listScore && listScore.length) {
      listScore.forEach((element) => {
        data.push({
          studentId: element.student_id,
          score: "",
        });
      });
    }

    return data;
  }, [listScore]);

  // header and data of data score grade
  const exportDataHeader = useMemo(() => {
    let array = [
      { label: "Họ và tên", key: "fullname" },
      { label: "Mã số học viên", key: "studentid" },
      { label: "Điểm tổng kết", key: "total" },
    ];

    if (listAssign && listAssign.length) {
      listAssign.forEach((element) => {
        array.push({
          label: element.name,
          key: element.name.replace(/ /g, "_"),
        });
      });
    }
    return array;
  }, [listAssign]);

  const exportDataData = useMemo(() => {
    return data;
  }, [data]);

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
          accessor: element.name.replace(/ /g, "_"),
          collapse: true,
          isTotal: true,
          colId: element.id,
          isFinalized: element.isFinalized,
        };
        arrayHeader[1].columns.push(a);
      });
    }

    return arrayHeader;
  }, [listAssign]);

  // edit data cell
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

  // handle table
  const updateStatusStudent = (rowIndex: any, value: any) => {
    console.log("haha", rowIndex);
  };

  const handleScoreListUploaded = async (e: any) => {
    const file: File = e.target.files[0];

    if (file) {
      const content = await getContentFromExcelFile(file);

      // Remove first row which is header
      content.shift();

      const studentScores: Array<{ student_id: string; point: number }> = [];

      for (const element of content) {
        if (element.length !== 2) {
          // thông báo file không đúng template
          return;
        }

        studentScores.push({
          student_id: element[0],
          point: element[1],
        });
      }

      console.log("studentScores: ", studentScores);

      if (studentScores) {
        dispatch(
          doAddScoreAssignmentCate({
            assignment_category_id: colFocus,
            scores: studentScores,
          })
        );
      }
    }
  };

  const handleStudentListUploaded = async (e: any) => {
    const file: File = e.target.files[0];

    if (file) {
      const content = await getContentFromExcelFile(file);

      // Remove first row which is header
      content.shift();

      const students: Array<{ student_id: string; full_name: string }> = [];

      for (const element of content) {
        if (element.length !== 2) {
          // thông báo file không đúng template
          return;
        }

        students.push({
          student_id: element[0],
          full_name: element[1],
        });
      }

      console.log("students: ", students);

      if (students) {
        dispatch(
          doAddStudentsToCourse({
            students: students,
            course_id: parseInt(classId),
          })
        );
      }
    }
  };

  const getContentFromExcelFile = async (file: File) => {
    const data = await file.arrayBuffer();

    const wb = xlsx.read(data);
    const wsname = wb.SheetNames[0];
    const ws = wb.Sheets[wsname];

    const content: Array<Array<any>> = xlsx.utils.sheet_to_json(ws, {
      header: 1,
    });

    return content;
  };

  const handleStudentListImportClicked = () => {
    if (refInputStudentList) {
      refInputStudentList.current.click();
    }
  };

  const handleScoreListImportClicked = (column: any) => {
    setColFocus(column.colId);
    if (refInputScoreList) {
      refInputScoreList.current.click();
    }
  };

  const handleFinalizeColumn = (column: any) => {
    if (column && column.colId) {
      dispatch(doFinalizeAssignment({ assignmentCategoryId: column.colId }));
    }
  };

  const handleSaveData = () => {
    if (data && listAssign) {
      listAssign.forEach((element) => {
        let studentScores: Array<{ student_id: string; point: number }> = [];
        data.forEach((col: any) => {
          const score = col[element.name.replace(/ /g, "_")] || "";

          studentScores.push({
            student_id: col.studentid,
            point: parseInt(score),
          });
        });

        dispatch(
          doAddScoreAssignmentCate({
            assignment_category_id: element.id,
            scores: studentScores,
          })
        );
      });
    }
  };

  // effect
  useEffect(() => {
    dispatch(doGetAllAssignByCourse({ course_id: classId }));
    // dispatch(doGetAllStudentOfCourse({ course_id: parseInt(classId) }));
    dispatch(doGetAllScoreOfCourse({ course_id: parseInt(classId) }));
  }, [classId]);

  useEffect(() => {
    setData(makeData(listScore, listAssign));
  }, [listScore, listAssign]);

  useEffect(() => {
    setSkipPageReset(false);
  }, [data]);

  // render
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
          onChange={(e) => handleScoreListUploaded(e)}
        />
        <input
          type="file"
          style={{ display: "none" }}
          ref={refInputStudentList}
          accept=".csv,.xlsx"
          onChange={(e) => handleStudentListUploaded(e)}
        />

        <div
          className="room-score__groupBtn"
          style={{ justifyContent: "flex-end" }}
        >
          <CSVLink
            data={exportDataData}
            headers={exportDataHeader}
            filename={"classroom-score.csv"}
          >
            <Button className="room-score__button" variant="outline-success">
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
            headers={studentListHeader}
            filename={"student-list-template.csv"}
          >
            <Button className="room-score__button" variant="outline-primary">
              Tải mẫu nhập danh sách học viên
            </Button>
          </CSVLink>
          <CSVLink
            data={scoreListData}
            headers={scoreListHeader}
            filename={"score-list-template.csv"}
          >
            <Button className="room-score__button" variant="outline-primary">
              Tải mẫu nhập cột điểm
            </Button>
          </CSVLink>

          <Button
            className="room-score__button"
            variant="outline-dark"
            onClick={handleStudentListImportClicked}
          >
            Nhập dữ liệu danh sách học viên(csv)
          </Button>
          {/* <Button
            className="room-score__button"
            variant="outline-dark"
            onClick={handleScoreListImportClicked}
          >
            Nhập dữ liệu danh sách điểm(csv)
          </Button> */}
        </div>

        <Table
          columns={columns}
          data={data}
          updateMyData={updateMyData}
          skipPageReset={skipPageReset}
          updateStatusStudent={updateStatusStudent}
          handleImportColumn={handleScoreListImportClicked}
          handleFinalizeColumn={handleFinalizeColumn}
          handleSaveData={handleSaveData}
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

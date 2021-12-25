import React, { useState, useEffect, useMemo, useRef } from "react";
import { useParams } from "react-router";
import { HeaderRoom, Page404 } from "../../components/common";
import { OffCanvas, Table } from "../../components";
import {
  useAppSelector,
  useAppDispatch,
  useFetchOneCourseQuery,
  doGetAllAssignByCourse,
  doGetSStudentScore,
} from "../../redux";
import { makeData } from "../RoomScore/MakeData";
import { useHistory } from "react-router-dom";
import "./StudentScore.scss";
import { Button } from "react-bootstrap";

export const StudentScore = () => {
  const dispatch = useAppDispatch();
  const { classId } = useParams<{ classId: string }>();
  const [showCanvas, setShowCanvas] = useState(false);
  const oneCourse = useFetchOneCourseQuery({ courseId: classId }).data;
  const { listAssign } = useAppSelector((state) => state.assignCateSlice);
  const { listScore, studentScore } = useAppSelector(
    (state) => state.scoreSlice
  );

  const [skipPageReset, setSkipPageReset] = useState(false);
  const [colFocus, setColFocus] = useState(0);

  const [data, setData] = useState([{}]);
  const [originalData] = useState(data);

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
            // isTotal: true,
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
          // isTotal: true,
          colId: element.id,
          isStudent: true,
          // isFinalized: element.isFinalized,
        };
        arrayHeader[1].columns.push(a);
      });
    }

    return arrayHeader;
  }, [listAssign]);

  useEffect(() => {
    dispatch(doGetAllAssignByCourse({ course_id: classId }));
    dispatch(doGetSStudentScore({ course_id: parseInt(classId) }));
  }, [classId]);

  useEffect(() => {
    setData(makeData(listScore, listAssign));
  }, [listScore, listAssign]);

  useEffect(() => {
    setSkipPageReset(false);
  }, [data]);

  useEffect(() => {
    let newData: any = {};
    let newArr = [];
    if (studentScore && studentScore.score) {
      newData["fullname"] = studentScore.student.full_name;
      newData["studentid"] = studentScore.student.student_id;

      let totalScore = 0;
      let totalPoint = 0;
      listAssign.forEach((element) => {
        totalPoint += element.point;
        let index = -1;

        if (studentScore.score.length) {
          index = studentScore.score.findIndex(
            (item) => item.assignment_category_id === element.id
          );
        }

        if (index >= 0 && element.isFinalized) {
          newData[element.name.replace(/ /g, "_")] =
            studentScore.score[index].point;
          totalScore += (studentScore.score[index].point / 100) * element.point;
        } else newData[element.name.replace(/ /g, "_")] = "";
      });

      if (totalPoint > 0 && totalScore > 0) {
        newData["total"] = ((totalScore / totalPoint) * 100).toFixed(2);
      }
    }

    newArr.push(newData);

    setData(newArr);
  }, [studentScore]);

  // render
  if (!oneCourse || !oneCourse.course_id) {
    return <Page404 />;
  }

  return (
    <div className="student-score">
      <HeaderRoom
        classId={classId}
        handleAction1={() => setShowCanvas(true)}
        className={oneCourse.course_name}
      />

      <>
        <div className="student-score__header">
          <h1 style={{ fontWeight: "bold", margin: "40px" }}>Điểm số</h1>
          {/* <Button variant="outline-primary">Báo cáo</Button> */}
        </div>

        <Table
          columns={columns}
          data={data}
          updateMyData={() => {}}
          skipPageReset={skipPageReset}
          updateStatusStudent={() => {}}
          handleImportColumn={() => {}}
          handleFinalizeColumn={() => {}}
          handleSaveData={() => {}}
          isStudentTable={true}
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

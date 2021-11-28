import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { HeaderRoom, Page404 } from "../../components/common";
import {
  OffCanvas,
  CardPost,
  InputPost,
  RoomGradeCard,
} from "../../components";
import { IDefaultClass } from "../../constants/images";
import { Row, Col } from "react-bootstrap";
import {
  useAppDispatch,
  useAppSelector,
  doGetOneCourse,
  useFetchOneCourseQuery,
  doGetAllAssignByCourse,
} from "../../redux";
import "./Room.scss";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { VscCopy } from "react-icons/vsc";

export const Room = () => {
  const dispatch = useAppDispatch();
  const { classId } = useParams<{ classId: string }>();
  const [showCanvas, setShowCanvas] = useState(false);
  const oneCourse = useFetchOneCourseQuery({ courseId: classId }).data;
  const { listAssign } = useAppSelector((state) => state.assignCateSlice);
  const { user_id } = useAppSelector((state) => state.userSlice.dataUser);

  const isHost = user_id === oneCourse?.course_hostid ? true : false;

  const notify = () => {
    handleCopyClipBoard();
    toast("Sao chép thành công", {
      position: toast.POSITION.BOTTOM_RIGHT,
      className: "foo-bar",
    });
  };

  const handleCopyClipBoard = () => {
    const el = document.createElement("input");
    el.value = classId;
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
  };

  useEffect(() => {
    dispatch(doGetAllAssignByCourse({ course_id: classId }));
  }, []);

  if (!oneCourse || !oneCourse.course_id) {
    return <Page404 />;
  }

  return (
    <div className="room">
      <HeaderRoom
        classId={classId}
        handleAction1={() => setShowCanvas(true)}
        className={oneCourse?.course_name}
      />

      <div className="room__container">
        <div
          className="room__background"
          style={{ backgroundImage: `url(${IDefaultClass})` }}
        >
          <div className="room__background-content">
            <p>{oneCourse?.course_name}</p>
            <span>Mã môn học: {oneCourse?.course_code}</span>
          </div>
        </div>

        <Row className="room__row">
          <Col className="room__col--1" md={3}>
            <div className="room__card room__deadline">
              <p>Mã khóa học</p>
              <span className="room__text">
                {classId}{" "}
                <VscCopy
                  className="room-edit__icon"
                  onClick={notify}
                  size={25}
                />
              </span>
            </div>

            <div className="room__card room__deadline">
              <p>Sắp đến hạn</p>
              <span>Tuyệt vời, không có bài tập nào sắp đến hạn!</span>
            </div>

            <RoomGradeCard roomId={classId} listAssign={listAssign} isHost={isHost} />
          </Col>
          <Col className="room__col--2" md={9}>
            <InputPost />
            <CardPost />
            <CardPost />
          </Col>
        </Row>
      </div>

      <OffCanvas
        show={showCanvas}
        setShow={setShowCanvas}
        handleClose={() => setShowCanvas(false)}
      />

      <ToastContainer autoClose={1500} />
    </div>
  );
};

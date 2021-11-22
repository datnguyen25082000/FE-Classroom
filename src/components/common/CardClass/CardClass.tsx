import React, { useState } from "react";
import { Card, Button } from "react-bootstrap";
import "./CardClass.scss";
import { transformDateFormat } from "../../../helpers/time";
import { FiMoreHorizontal } from "react-icons/fi";
import { Popover, OverlayTrigger } from "react-bootstrap";
import { ModalConfirm } from "../..";
import {
  useAppSelector,
  useAppDispatch,
  doLeaveCourse,
  doFakeLeaveCourse,
} from "../../../redux";

export const CardClass: React.FC<ICardClass> = ({
  classInfo,
  handleAction,
}) => {
  const dispatch = useAppDispatch();
  const [show, setShow] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);
  const { user_id } = useAppSelector((state) => state.userSlice.dataUser);

  const handleShowModal = () => {
    setShow(true);
    setShowOverlay(false);
  };

  const popover = (
    <Popover
      id="popover-basic"
      style={{ display: showOverlay ? "block" : "none" }}
    >
      <Popover.Header as="h3">Tùy chọn</Popover.Header>
      <Popover.Body>
        <div className="card-student__item" onClick={() => handleShowModal()}>
          Rời khỏi lớp học
        </div>
      </Popover.Body>
    </Popover>
  );

  const handleLeaveCourse = () => {
    if (classInfo) {
      dispatch(doLeaveCourse({ course_id: classInfo?.course_id }));
      dispatch(doFakeLeaveCourse(classInfo?.course_id));
    }
    setShow(false);
  };

  return (
    <div key={classInfo.course_id} className="card-class">
      <Card style={{ width: "18rem", height: "100%" }}>
        <Card.Img
          variant="top"
          src={classInfo.course_thumbnail}
          className="card-class__image"
        />
        <Card.Body className="card-class__body">
          <Card.Title>{classInfo.course_name}</Card.Title>
          <Card.Text className="card-class__create-date">
            Ngày tạo:&nbsp;
            {transformDateFormat(classInfo?.course_createdate || "")}
          </Card.Text>
          <Button
            variant="primary"
            className="card-class__button"
            onClick={handleAction}
          >
            Vào lớp
          </Button>
        </Card.Body>
        {user_id !== classInfo.course_hostid && (
          <OverlayTrigger
            trigger="click"
            placement="bottom"
            overlay={popover}
            rootClose
          >
            <div
              className="card-class__more"
              onClick={() => setShowOverlay(true)}
            >
              <FiMoreHorizontal size={20} />
            </div>
          </OverlayTrigger>
        )}
      </Card>

      <ModalConfirm
        show={show}
        handleClose={() => setShow(false)}
        title="Rời khóa học"
        buttonAction="Rời khóa học"
        handleAction={handleLeaveCourse}
      >
        <p>
          Rời khóa học
          <span style={{ fontWeight: 500 }}>
            {" " + classInfo?.course_name}
          </span>{" "}
          ?
        </p>
        <p>
          Sau khi rời khóa học, bạn sẽ không thể truy cập vào lớp học nữa và sẽ
          xóa các dữ liệu liên quan.
        </p>
      </ModalConfirm>
    </div>
  );
};

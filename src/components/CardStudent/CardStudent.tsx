import React, { useRef, useState } from "react";
import "./CardStudent.scss";
import { Avatar } from "../../components/common";
import { IDefaultAvatar } from "../../constants/images";
import { FiMoreVertical } from "react-icons/fi";
import { Popover, OverlayTrigger, Button, Modal } from "react-bootstrap";
import { ModalConfirm } from "..";

interface ICardStudent {
  isTeacher?: boolean;
  isActive?: boolean;
}

export const CardStudent: React.FC<ICardStudent> = ({
  isTeacher = false,
  isActive = true,
}) => {
  const [show, setShow] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleClickItem = () => {
    setShowOverlay(false);
    handleShow();
  };

  const popover = (
    <Popover
      id="popover-basic"
      style={{ display: showOverlay ? "block" : "none" }}
    >
      <Popover.Header as="h3">Tùy chọn</Popover.Header>
      <Popover.Body>
        <div className="card-student__item" onClick={handleClickItem}>
          {isActive
            ? isTeacher
              ? "Xóa giáo viên"
              : " Xóa học viên"
            : "Xóa lời mời"}
        </div>
      </Popover.Body>
    </Popover>
  );

  return (
    <div className="card-student">
      <div className="card-student__left">
        <Avatar image={IDefaultAvatar} />
        <span>Nguyễn Anh Kiệt</span>
      </div>
      <OverlayTrigger
        trigger="click"
        placement="bottom"
        overlay={popover}
        rootClose
      >
        <div
          className="card-student__right"
          onClick={() => setShowOverlay(true)}
        >
          <FiMoreVertical size={20} />
        </div>
      </OverlayTrigger>

      <ModalConfirm show={show} handleClose={handleClose} title="Xóa học viên">
        <p>
          Xóa học viên
          <span style={{ fontWeight: 500 }}> Nguyễn Tấn Đạt</span> ?
        </p>
        <p>
          Học viên sau khi bị xóa khỏi khóa học sẽ không thể truy cập vào khóa
          học này.
        </p>
      </ModalConfirm>
    </div>
  );
};

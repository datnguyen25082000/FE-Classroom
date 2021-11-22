import React, { useRef, useState } from "react";
import "./CardStudent.scss";
import { Avatar } from "../../components/common";
import { IDefaultAvatar } from "../../constants/images";
import { FiMoreVertical } from "react-icons/fi";
import { Popover, OverlayTrigger, Button, Modal } from "react-bootstrap";
import { ModalConfirm } from "..";

interface ICardStudent {
  isTeacher?: boolean;
  user_displayname?: string;
  user_studentid?: string;
  avatar?: string;
  isHost?: boolean;
  isMyAccount?: boolean;
}

export const CardStudent: React.FC<ICardStudent> = ({
  isTeacher = false,
  user_displayname,
  avatar,
  isHost = false,
  isMyAccount = false,
  user_studentid,
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
          {isTeacher ? "Xóa giáo viên" : " Xóa học viên"}
        </div>
      </Popover.Body>
    </Popover>
  );

  return (
    <div className="card-student">
      <div className="card-student__left">
        <Avatar image={avatar || IDefaultAvatar} />
        <span>
          {user_displayname}{" "}
          {user_studentid ? ` - MSSV: ${user_studentid}` : ""}
        </span>
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
          {isHost && !isMyAccount && <FiMoreVertical size={20} />}
        </div>
      </OverlayTrigger>

      <ModalConfirm show={show} handleClose={handleClose} title="Xóa học viên">
        <p>
          Xóa học viên
          <span style={{ fontWeight: 500 }}> {user_displayname}</span> ?
        </p>
        <p>
          Học viên sau khi bị xóa khỏi khóa học sẽ không thể truy cập vào khóa
          học này.
        </p>
      </ModalConfirm>
    </div>
  );
};

import React, { useState } from "react";
import { useParams } from "react-router";
import { HeaderRoom } from "../../components/common";
import { OffCanvas, CardStudent, ModalAddStudent } from "../../components";
import "./RoomMember.scss";
import { BsPersonPlus } from "react-icons/bs";
import { doInviteViaEmail, useAppDispatch } from "../../redux";

export const RoomMember = () => {
  const dispatch = useAppDispatch();
  const { classId } = useParams<{ classId: string }>();
  const [showCanvas, setShowCanvas] = useState(false);
  const list = [1, 2, 3, 4, 5, 6];
  const [show, setShow] = useState(false);
  const [isTeacherModal, setIsTeacherModal] = useState(false);

  const handleClose = () => setShow(false);

  const handleShow = (isTeacher: boolean) => {
    setIsTeacherModal(isTeacher);
    setShow(true);
  };

  const handleSendMail = (email: string) => {
    dispatch(
      doInviteViaEmail({
        email,
        course_id: classId,
        teacher_invite: isTeacherModal,
      })
    );
    handleClose();
  };

  return (
    <div className="room-member">
      <HeaderRoom classId={classId} handleAction1={() => setShowCanvas(true)} />

      <div className="room-member__container ">
        <div>
          <div className="room-member__students">
            <p className="room-member__title">Giáo viên</p>
            <div className="room-member__students--count">
              <BsPersonPlus
                className="room-member__students--icons"
                size={25}
                onClick={() => handleShow(true)}
              />
            </div>
          </div>
          <div className="room-member__list">
            {list && list.length ? <CardStudent isTeacher={true} /> : <></>}
          </div>
        </div>
        <div>
          <div className="room-member__students">
            <p className="room-member__title">Học viên</p>
            <div className="room-member__students--count">
              <span>36 học viên</span>
              <BsPersonPlus
                className="room-member__students--icons"
                size={25}
                onClick={() => handleShow(false)}
              />
            </div>
          </div>
          <div className="room-member__list">
            {list && list.length ? (
              list.map((item, i) => {
                return <CardStudent key={i} />;
              })
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
      <OffCanvas
        show={showCanvas}
        setShow={setShowCanvas}
        handleClose={() => setShowCanvas(false)}
      />

      <ModalAddStudent
        show={show}
        setShow={setShow}
        handleClose={() => setShow(false)}
        isTeacherModal={isTeacherModal}
        handleAction={handleSendMail}
      />
    </div>
  );
};

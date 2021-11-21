import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { HeaderRoom } from "../../components/common";
import {
  useAppDispatch,
  useAppSelector,
  doGetAllMembers,
  doInviteViaEmail,
} from "../../redux";
import { OffCanvas, CardStudent, ModalAddStudent } from "../../components";
import "./RoomMember.scss";
import { BsPersonPlus } from "react-icons/bs";
import { UserRole } from "../../constants/user-role";

export const RoomMember = () => {
  const dispatch = useAppDispatch();
  const { allMembers } = useAppSelector((state) => state.courseJoinSlice);
  const [teachers, setTeachers] = useState(new Array<IResMember>());
  const [students, setStudents] = useState(new Array<IResMember>());

  const { classId } = useParams<{ classId: string }>();
  const [showCanvas, setShowCanvas] = useState(false);
  const [show, setShow] = useState(false);
  const [isTeacherModal, setIsTeacherModal] = useState(false);

  const handleClose = () => setShow(false);

  const handleShow = (isTeacher: boolean) => {
    setIsTeacherModal(isTeacher);
    setShow(true);
  };

  useEffect(() => {
    dispatch(doGetAllMembers({ courseId: classId }));
  }, []);

  useEffect(() => {
    setTeachers(
      allMembers.filter(
        (x) => x.user_role === UserRole.Teacher || x.user_role === UserRole.Host
      )
    );
    setStudents(allMembers.filter((x) => x.user_role === UserRole.Student));
  }, [allMembers]);

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
              <span>{teachers.length} giáo viên</span>
              <BsPersonPlus
                className="room-member__students--icons"
                size={25}
                onClick={() => handleShow(true)}
              />
            </div>
          </div>
          <div className="room-member__list">
            {teachers && teachers.length ? (
              teachers.map((user, i) => {
                return (
                  <CardStudent
                    key={i}
                    user_displayname={user.user_displayname}
                    isTeacher={true}
                  />
                );
              })
            ) : (
              <></>
            )}
          </div>
        </div>
        <div>
          <div className="room-member__students">
            <p className="room-member__title">Học viên</p>
            <div className="room-member__students--count">
              <span>{students.length} học viên</span>
              <BsPersonPlus
                className="room-member__students--icons"
                size={25}
                onClick={() => handleShow(false)}
              />
            </div>
          </div>
          <div className="room-member__list">
            {students && students.length ? (
              students.map((user, i) => {
                return (
                  <CardStudent
                    key={i}
                    user_displayname={user.user_displayname}
                  />
                );
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

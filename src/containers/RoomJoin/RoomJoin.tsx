import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { HeaderRoom, Page404, ModalCenter } from "../../components/common";
import { OffCanvas, CardPost, InputPost } from "../../components";
import { IDefaultClass } from "../../constants/images";
import { Row, Col } from "react-bootstrap";
import {
  useAppDispatch,
  useAppSelector,
  doGetOneCourse,
  useFetchOneCourseQuery,
  doJoinCourseViaInvitationCode,
} from "../../redux";
import "./RoomJoin.scss";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { VscCopy } from "react-icons/vsc";
import { transformDateFormat } from "../../helpers/time";
import { unwrapResult } from "@reduxjs/toolkit";
import { useHistory } from "react-router";

export const RoomJoin = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const { invitationCode } = useParams<{ invitationCode: string }>();
  const [showCanvas, setShowCanvas] = useState(false);
  const oneCourse = useFetchOneCourseQuery({ courseId: invitationCode }).data;
  const { courseId } = useAppSelector((state) => state.courseJoinSlice);
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    dispatch(doJoinCourseViaInvitationCode({ code: invitationCode }))
      .then(unwrapResult)
      .then((res: any) => {
        if (res && res.content) {
          history.push(`/classroom/${res.content}/newsfeed`);
        } else {
          setMessage(
            "Tham gia lớp học không thành công. Hãy liên hệ với chủ lớp học để nhận được link mới nhất"
          );
          setShowModal(true);
        }
      });
  }, [invitationCode]);

  if (!oneCourse || !oneCourse.course_id) {
    return <Page404 />;
  }

  const handleClose = () => {
    setShowModal(false);
    history.push("/");
  };

  return (
    <div>
      <ModalCenter
        show={showModal}
        onHide={handleClose}
        handleClose={handleClose}
        message={message}
      ></ModalCenter>
    </div>
  );
};

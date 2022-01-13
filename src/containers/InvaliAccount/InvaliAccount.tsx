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
  doActiveUser,
} from "../../redux";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { VscCopy } from "react-icons/vsc";
import { transformDateFormat } from "../../helpers/time";
import { unwrapResult } from "@reduxjs/toolkit";
import { useHistory, useLocation } from "react-router";

export const InvaliAccount = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const location = useLocation();
  const code = new URLSearchParams(location.search).get("code");
  const [showCanvas, setShowCanvas] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (code) {
      dispatch(doActiveUser({ code: code }))
        .then(unwrapResult)
        .then((res: any) => {
          if (res && res.content) {
            setMessage("Kích hoạt tài khoản thành công.");
            setShowModal(true);
          } else {
            setMessage(
              "Kích hoạt tài khoản không thành công. Hãy liên hệ với chủ lớp học để nhận được link mới nhất"
            );
            setShowModal(true);
          }
        });
    }
  }, [code]);

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

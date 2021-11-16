import React, { useState, useEffect } from "react";
import { Tabs, Input, ModalCenter } from "../../components/common";
import { Button } from "react-bootstrap";
import { MdFacebook } from "react-icons/md";
import { AiFillGooglePlusCircle } from "react-icons/ai";
import "./ForgotPass.scss";
import { useForm } from "react-hook-form";
import { unwrapResult } from "@reduxjs/toolkit";
import { EToken } from "../../constants";
import { SvgLogin } from "../../constants/images";
import { useHistory } from "react-router";
export const ForgotPass = () => {
  const history = useHistory();
  const [message, setMessage] = useState("");
  const [kindModal, setKindModal] = useState(1);
  const [showModal, setShowModal] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const handleReturn = () => {
    history.goBack();
  };

  const onSubmit = () => {};

  return (
    <div className="login-container">
      <img src={SvgLogin} alt="Image" />
      <div className="login-modal forgot-pass__modal">
        <h1>NTD Classroom</h1>
        <div className="forgot-pass__box">
          <p className="forgot-pass__title">QUÊN MẬT KHẨU</p>
          <Input
            label="Email"
            type="text"
            placeholder="Nhập email đăng ký tài khoản"
            {...register("login_username", {
              required: "Vui lòng nhập tên đăng nhập",
              maxLength: 40,
            })}
            error={errors.login_username ? errors.login_username.message : ""}
          />
          <div className="forgot-pass__groupBtn">
            <Button
              variant="secondary"
              className="forgot-pass__btn"
              onClick={() => handleReturn()}
            >
              Quay về
            </Button>{" "}
            <Button
              variant="primary"
              className="forgot-pass__btn"
              onClick={() => handleSubmit(onSubmit)}
            >
              Gửi mã xác nhận
            </Button>{" "}
          </div>
        </div>

        <ModalCenter
          show={showModal}
          onHide={() => setShowModal(false)}
          handleClose={() => setShowModal(false)}
          message={message}
        ></ModalCenter>
      </div>
    </div>
  );
};

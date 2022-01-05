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
import { validateEmail } from "../../helpers";

export const ForgotPass = () => {
  const history = useHistory();
  const [message, setMessage] = useState("");
  const [isDisable, setIsDisable] = useState(true);
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

  const onSubmit = (data: any) => {
    
  };

  const handleSendOTP = () => {
    setIsDisable(false);
  };

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
            titleAction="Gửi mã OTP"
            handleAction={() => handleSendOTP()}
            placeholder="Nhập email đăng ký tài khoản"
            {...register("email", {
              required: "Vui lòng nhập tên đăng nhập",
              validate: (value) =>
                validateEmail(value) || "Email chưa đúng định dạng",
              maxLength: 40,
            })}
            error={errors.email ? errors.email.message : ""}
          />
          <Input
            label="Mã OTP"
            type="text"
            isDisable={isDisable}
            placeholder="Nhập mã OTP được gửi đến email"
            {...register("login_username", {
              required: "Vui lòng nhập tên đăng nhập",
              maxLength: 40,
            })}
            error={errors.login_username ? errors.login_username.message : ""}
          />
          <Input
            label="Mật khẩu mới"
            type="password"
            isDisable={isDisable}
            showPassword={true}
            placeholder="Nhập mật khẩu mới"
            {...register("password", {
              required: "Vui lòng nhập mật khẩu mới",
              minLength: {
                value: 6,
                message: "Độ dài mật khẩu không nhỏ hơn 6",
              },
              maxLength: 40,
            })}
            error={errors.password ? errors.password.message : ""}
          />
          <Input
            label="Nhập lại mật khẩu mới"
            type="password"
            isDisable={isDisable}
            showPassword={true}
            placeholder="Nhập lại mật khẩu mới"
            {...register("repassword", {
              required: "Nhập lại mật khẩu không chính xác",
              minLength: {
                value: 6,
                message: "Độ dài mật khẩu không nhỏ hơn 6",
              },
              validate: (value) =>
                value === watch("password") ||
                "Nhập lại mật khẩu không chính xác",
            })}
            error={errors.repassword ? errors.repassword.message : ""}
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
              disabled={isDisable}
              className="forgot-pass__btn"
              onClick={handleSubmit(onSubmit)}
            >
              Xác nhận
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

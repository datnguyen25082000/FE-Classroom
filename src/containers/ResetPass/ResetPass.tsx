import React, { useState, useEffect } from "react";
import { Tabs, Input, ModalCenter } from "../../components/common";
import { Button } from "react-bootstrap";
import { MdFacebook } from "react-icons/md";
import { AiFillGooglePlusCircle } from "react-icons/ai";
import "./ResetPass.scss";
import { useForm } from "react-hook-form";
import { unwrapResult } from "@reduxjs/toolkit";
import { EToken } from "../../constants";
import { SvgLogin } from "../../constants/images";
import { useHistory } from "react-router";

export const ResetPass = () => {
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

  const onSubmit = (data: any) => {
    console.log("haha");

    const value = {
      username: data.password,
      password: data.repassword,
    };

    console.log("value", value);
  };

  return (
    <div className="login-container">
      <img src={SvgLogin} alt="Image" />
      <div className="login-modal reset-pass__modal">
        <h1>NTD Classroom</h1>
        <div className="reset-pass__box">
          <p className="reset-pass__title">ĐẶT LẠI MẬT KHẨU</p>
          <Input
            label="Mật khẩu"
            type="text"
            placeholder="Nhập mật khẩu"
            {...register("password", {
              required: "Vui lòng nhập mật khẩu mới",
              maxLength: 40,
            })}
            error={errors.password ? errors.password.message : ""}
          />
          <Input
            label="Nhập lại mật khẩu"
            type="text"
            placeholder="Nhập lại mật khẩu"
            {...register("repassword", {
              required: "Nhập lại mật khẩu không chính xác",
              validate: (value) =>
                value === watch("password") ||
                "Nhập lại mật khẩu không chính xác",
            })}
            error={errors.repassword ? errors.repassword.message : ""}
          />
          <div className="reset-pass__groupBtn">
            <Button
              variant="secondary"
              className="reset-pass__btn"
              onClick={() => handleReturn()}
            >
              Quay về
            </Button>{" "}
            <Button
              variant="primary"
              className="reset-pass__btn"
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

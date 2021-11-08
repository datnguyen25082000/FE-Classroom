import React, { useState, useEffect } from "react";
import { Tabs, Input, ModalCenter } from "../../components/common";
import { Button } from "react-bootstrap";
import { MdFacebook } from "react-icons/md";
import { AiFillGooglePlusCircle } from "react-icons/ai";
import "./Login.scss";
import { useForm } from "react-hook-form";
import {
  useAppDispatch,
  useAppSelector,
  doLogin,
  doRegister,
} from "../../redux";
import { unwrapResult } from "@reduxjs/toolkit";
import { EToken } from "../../constants";
import { SvgLogin } from "../../constants/images";

export const Login: React.FC<any> = ({ isOpen, setIsOpen }) => {
  const dispatch = useAppDispatch();

  const [message, setMessage] = useState("");
  const [kindModal, setKindModal] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const {
    register: register2,
    formState: { errors: errors2 },
    watch: watch2,
    handleSubmit: handleSubmit2,
  } = useForm();

  const onSubmit = (data: any) => {
    if (kindModal === 1) {
      const value = {
        username: data.login_username,
        password: data.login_password,
      };

      dispatch(doLogin(value))
        .then(unwrapResult)
        .then((res: IResLogin) => {
          if (res.content && res.content.token) {
            const token = res.content.token;
            window.localStorage.setItem(EToken.loginToken, token);
            window.location.replace("/");
          } else {
            setMessage(res.message);
            setShowModal(true);
          }
        });
    } else if (kindModal === 2) {
      const value = {
        username: data.register_username,
        password: data.register_password,
        fullname: data.register_fullname,
      };

      dispatch(doRegister(value))
        .then(unwrapResult)
        .then((res: IResLogin) => {
          setMessage(res.message);
          setShowModal(true);
        });
    }
  };

  return (
    <div className="login-container">
      <img src={SvgLogin} alt="Image" />
      <div className="login-modal">
        <h1>NTD Classroom</h1>
        <Tabs
          titleTabs={[
            <div
              className="login-modal__title"
              onClick={() => {
                setKindModal(1);
              }}
            >
              <span>Đăng nhập</span> <hr />
            </div>,
            <div
              className="login-modal__title"
              onClick={() => {
                setKindModal(2);
              }}
            >
              <span>Đăng ký</span> <hr />
            </div>,
            ,
          ]}
          bodyTabs={[
            <div className="login-modal__login">
              <Input
                label="Tên đăng nhập"
                type="text"
                placeholder="Nhập tên đăng nhập"
                {...register("login_username", {
                  required: "Vui lòng nhập tên đăng nhập",
                  maxLength: 40,
                })}
                error={
                  errors.login_username ? errors.login_username.message : ""
                }
              />
              <Input
                label="Mật khẩu"
                type="password"
                showPassword={true}
                placeholder="Nhập mật khẩu"
                {...register("login_password", {
                  required: "Vui lòng nhập mật khẩu",
                  maxLength: 40,
                })}
                error={
                  errors.login_password ? errors.login_password.message : ""
                }
              />
              <div>
                Quick start:{" "}
                <span style={{ fontSize: 15, fontWeight: "bold" }}>
                  (Username: admin - password: 123123)
                </span>
              </div>
              <span className="login-modal__forgot-pass">Quên mật khẩu?</span>
              <div className="login-modal__group-btn">
                <Button
                  variant={
                    watch("login_username") && watch("login_password")
                      ? "primary"
                      : "secondary"
                  }
                  disabled={
                    watch("login_username") && watch("login_password")
                      ? false
                      : true
                  }
                  className="login-modal__btn"
                  onClick={handleSubmit(onSubmit)}
                >
                  Đăng nhập
                </Button>
                <Button variant="primary" className="login-modal__btn">
                  <MdFacebook size={25} /> <span>Đăng nhập bằng Facebook</span>
                </Button>
                <Button className="login-modal__btn login-modal__btn--google">
                  <AiFillGooglePlusCircle size={25} />
                  <span>Đăng nhập bằng Google+</span>
                </Button>
              </div>
            </div>,
            <div className="login-modal__register">
              <Input
                label="Tên đăng nhập"
                type="text"
                placeholder="Nhập tên đăng nhập"
                // titleAction="Gửi mã OTP"
                {...register2("register_username", {
                  required: "Vui lòng nhập tên đăng nhập",
                  maxLength: 40,
                })}
                error={
                  errors2.register_username
                    ? errors2.register_username.message
                    : ""
                }
              />
              <Input
                label="Họ và tên"
                type="text"
                placeholder="Nhập họ và tên"
                // titleAction="Gửi mã OTP"
                {...register2("register_fullname", {
                  required: "Vui lòng nhập họ và tên",
                  maxLength: 40,
                })}
                error={
                  errors2.register_fullname
                    ? errors2.register_fullname.message
                    : ""
                }
              />
              <div className="login-modal__password">
                <Input
                  label="Mật khẩu"
                  type="password"
                  showPassword={true}
                  placeholder="Nhập mật khẩu"
                  {...register2("register_password", {
                    required: "Vui lòng nhập mật khẩu",
                    maxLength: 40,
                  })}
                  error={
                    errors2.register_password
                      ? errors2.register_password.message
                      : ""
                  }
                />
                <Input
                  label="Nhập lại mật khẩu"
                  type="password"
                  showPassword={true}
                  placeholder="Nhập lại mật khẩu"
                  {...register2("register_repassword", {
                    required: "Nhập lại mật khẩu không chính xác",
                    // minLength: { value: 6, message: 'Nhập lại mật khẩu không chính xác' },
                    validate: (value) =>
                      value === watch2("register_repassword") ||
                      "Nhập lại mật khẩu không chính xác",
                  })}
                  error={
                    errors2.register_repassword
                      ? errors2.register_repassword.message
                      : ""
                  }
                />
              </div>

              <div className="login-modal__group-btn">
                <Button
                  variant="primary"
                  className="login-modal__btn"
                  onClick={handleSubmit2(onSubmit)}
                >
                  Đăng ký
                </Button>
              </div>
            </div>,
          ]}
          classNameHeader="login-modal__header"
        ></Tabs>

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

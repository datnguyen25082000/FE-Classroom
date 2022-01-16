import React, { useState, useEffect } from "react";
import { Tabs, Input, ModalCenter } from "../../components/common";
import { Button } from "react-bootstrap";
import { MdFacebook } from "react-icons/md";
import "./LoginAdmin.scss";
import { useForm } from "react-hook-form";
import {
  useAppDispatch,
  useAppSelector,
  doLoginAdmin,
  doRegister,
} from "../../redux";
import { unwrapResult } from "@reduxjs/toolkit";
import { EToken } from "../../constants";
import { SvgLogin } from "../../constants/images";
import { useHistory } from "react-router";
import FacebookLogin from "react-facebook-login";
import { validateEmail } from "../../helpers";

export const LoginAdmin: React.FC<any> = ({ isOpen, setIsOpen }) => {
  const dispatch = useAppDispatch();
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

      dispatch(doLoginAdmin(value))
        .then(unwrapResult)
        .then((res: IResLogin) => {
          if (res.content && res.content.token) {
            const token = res.content.token;
            window.localStorage.setItem(EToken.loginToken, token);
            window.location.replace("/admin/home");
          } else {
            if (res.message === "ACCOUNT_IS_NOT_ACTIVATED_BY_USER") {
              setMessage(
                "Tài khoản chưa được kích hoạt. Vui lòng xác nhận ở tài khoản email đã đăng ký"
              );
              setShowModal(true);
              return;
            }

            if (res.message == "USERNAME_NOT_EXIST") {
              setMessage("Tài khoản không tồn tại");
              setShowModal(true);
              return;
            }

            if (res.message === "INCORRECT_PASSWORD") {
              setMessage("Mật khẩu đăng nhập không đúng");
            } else setMessage(res.message);
            setShowModal(true);
          }
        });
    } else if (kindModal === 2) {
      const value = {
        username: data.register_username,
        password: data.register_password,
        fullname: data.register_fullname,
        email: data.register_email,
      };

      dispatch(doRegister(value))
        .then(unwrapResult)
        .then((res: IResLogin) => {
          if (res?.content || res?.message) {
            setMessage(res.message || res.content);
          }
          setMessage("Đăng ký thành công ");
          setShowModal(true);
        });
    }
  };

  const handleForgot = () => {
    history.push("/forgot-password");
  };

  const responseFacebook = (res: any) => {
    const accessToken = res.accessToken;
    if (accessToken) {
      window.localStorage.setItem(EToken.loginToken, accessToken);
      if (
        document.referrer &&
        document.referrer.includes(window.location.origin)
      )
        window.location.replace(document.referrer);
      else {
        window.location.replace("/");
      }
    } else {
      setMessage("Đăng nhập thất bại");
      setShowModal(true);
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
              <span>Đăng nhập admin hệ thống</span> <hr />
            </div>,
            // <div
            //   className="login-modal__title"
            //   onClick={() => {
            //     setKindModal(2);
            //   }}
            // >
            //   <span>Đăng ký</span> <hr />
            // </div>,
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
                  (Username: superadmin - password: 123456)
                </span>
              </div>
              <span
                className="login-modal__forgot-pass"
                onClick={() => handleForgot()}
              >
                Quên mật khẩu?
              </span>
              <div className="login-modal__group-btn">
                <span>
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
                </span>
                {/* <FacebookLogin
                  appId="1042906876485319"
                  fields="name,email,picture"
                  scope="public_profile,user_friends"
                  callback={responseFacebook}
                  textButton=" Đăng nhập bằng Facebook"
                  cssClass="login-modal__btn btn btn-primary"
                  icon={<MdFacebook size={25} />}
                /> */}
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

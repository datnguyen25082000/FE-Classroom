import React, { useState, useEffect, useRef } from "react";
import "./UpdatePass.scss";
import {
  useAppDispatch,
  useAppSelector,
  doGetCurrentUser,
  doUpdateInfo,
  doUpdateAvatar,
  doFakeUpdateAvatar,
  doChangePass,
} from "../../redux";
import { useHistory } from "react-router";
import { Col, Row, Button } from "react-bootstrap";
import { Input, Header, ModalCenter } from "../../components/common";
import { UpdateAvatar } from "../../components";
import { ModalAddCourse, OffCanvas, ModalJoinCourse } from "../../components";
import { useForm } from "react-hook-form";
import { unwrapResult } from "@reduxjs/toolkit";
import { Modal } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";

export const UpdatePass = () => {
  const dispatch = useAppDispatch();
  const refImage: any = useRef(null);
  const history = useHistory();
  const [show, setShow] = useState(false);
  const [showCanvas, setShowCanvas] = useState(false);
  const [showJoin, setShowJoin] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showAvatar, setShowAvatar] = useState(false);
  const [message, setMessage] = useState("");

  const { dataUser } = useAppSelector((state) => state.userSlice);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => {
    const { oldpass, newpass } = data;
    dispatch(doChangePass({ currentPassword: oldpass, newPassword: newpass }))
      .then(unwrapResult)
      .then((res: any) => {
        if (res.content && res.content.user_id) {
          notify("Chỉnh sửa mật khẩu thành công");
        } else notify(res.content);
      });
  };

  useEffect(() => {
    dispatch(doGetCurrentUser());
    reset({});
  }, []);

  const handleRedirect = () => {
    history.goBack();
  };

  const notify = (string: string) => {
    toast(string, {
      position: toast.POSITION.BOTTOM_RIGHT,
      className: "foo-bar",
    });
  };

  return (
    <div className="update-pass">
      <Header
        handleAction1={() => setShowCanvas(true)}
        handleAction2={() => setShow(true)}
        handleAction3={() => setShowJoin(true)}
      />
      <ToastContainer autoClose={1500} />
      <Row>
        <Col md={3}>
          <div className="card h-100 update-pass__card">
            <div className="card-body update-pass__left">
              <UpdateAvatar
                onClick={(e: any) => {
                  e.stopPropagation();
                  if (refImage && refImage.current) refImage.current.click();
                }}
                onClickAvatar={() => {
                  setShowAvatar(true);
                }}
                avatarImg={dataUser?.user_avatar}
              />

              <p className="update-pass__name">{dataUser?.user_displayname}</p>

              <span className="update-pass__about"></span>
            </div>
          </div>
        </Col>
        <Col md={9}>
          <div className="card h-100 update-pass__card">
            <div className="card-body">
              <div className="row gutters">
                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                  <h6 className="update-pass__title">Đổi mật khẩu</h6>
                </div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <div className="col-8">
                    <Input
                      label="Mật khẩu cũ"
                      type="password"
                      showPassword={true}
                      {...register("oldpass", {
                        required: "Vui lòng nhập mật khẩu cũ",
                        maxLength: 40,
                      })}
                    />
                  </div>

                  <div className="col-8">
                    <Input
                      label="Mật khẩu mới"
                      type="password"
                      showPassword={true}
                      {...register("newpass", {
                        required: "Vui lòng nhập mật khẩu mới",
                        minLength: {
                          value: 6,
                          message: "Độ dài mật khẩu không nhỏ hơn 6",
                        },
                        maxLength: 40,
                      })}
                      error={errors.newpass ? errors.newpass.message : ""}
                    />
                  </div>

                  <div className="col-8">
                    <Input
                      label="Nhập lại mật khẩu mới"
                      type="password"
                      showPassword={true}
                      {...register("renewpass", {
                        required: "Nhập lại mật khẩu không chính xác",
                        minLength: {
                          value: 6,
                          message: "Độ dài mật khẩu không nhỏ hơn 6",
                        },
                        validate: (value) =>
                          value === watch("newpass") ||
                          "Nhập lại mật khẩu không chính xác",
                      })}
                      error={errors.renewpass ? errors.renewpass.message : ""}
                    />
                  </div>
                </div>
              </div>

              <div className="update-pass__groupBtn">
                <Button
                  variant="secondary"
                  className="update-pass__btn"
                  onClick={handleRedirect}
                >
                  Quay về
                </Button>
                <Button
                  variant="primary"
                  className="update-pass__btn"
                  onClick={handleSubmit(onSubmit)}
                >
                  Lưu thay đổi
                </Button>
              </div>
            </div>
          </div>
        </Col>
      </Row>

      <ModalAddCourse show={show} setShow={setShow} />
      <ModalJoinCourse show={showJoin} setShow={setShowJoin} />
      <OffCanvas
        show={showCanvas}
        setShow={setShowCanvas}
        handleClose={() => setShowCanvas(false)}
      />

      <ModalCenter
        show={showModal}
        onHide={() => setShowModal(false)}
        handleClose={() => setShowModal(false)}
        message={message}
      ></ModalCenter>

      <Modal
        show={showAvatar}
        aria-labelledby="contained-modal-title-vcenter"
        size="lg"
        centered
        onHide={() => setShowAvatar(false)}
      >
        <img
          className="update-pass__avatar-modal"
          src={dataUser?.user_avatar}
          alt=""
        />
        <Modal.Footer>
          <Button onClick={() => setShowAvatar(false)}>Tắt</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

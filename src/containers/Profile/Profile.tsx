import React, { useState, useEffect, useRef } from "react";
import "./Profile.scss";
import {
  useAppDispatch,
  useAppSelector,
  doGetCurrentUser,
  doUpdateInfo,
  doUpdateAvatar,
  doFakeUpdateAvatar,
} from "../../redux";
import { useHistory } from "react-router";
import { Col, Row, Button } from "react-bootstrap";
import { Input, Header, ModalCenter } from "../../components/common";
import { UpdateAvatar } from "../../components";
import { ModalAddCourse, OffCanvas, ModalJoinCourse } from "../../components";
import { useForm } from "react-hook-form";
import { unwrapResult } from "@reduxjs/toolkit";
import { Modal } from "react-bootstrap";

export const Profile = () => {
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
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => {
    dispatch(doUpdateInfo(data))
      .then(unwrapResult)
      .then((res: any) => {
        if (res.content && res.content.update) {
          setMessage("Cập nhập thông tin thành công");
        } else setMessage("Đã có lỗi xảy ra, vui lòng thử lại");

        setShowModal(true);
      });
  };

  useEffect(() => {
    dispatch(doGetCurrentUser());
  }, []);

  const handleRedirect = () => {
    history.goBack();
  };

  return (
    <div className="profile">
      <Header
        handleAction1={() => setShowCanvas(true)}
        handleAction2={() => setShow(true)}
        handleAction3={() => setShowJoin(true)}
      />

      <Row>
        <Col md={3}>
          <div className="card h-100 profile__card">
            <div className="card-body profile__left">
              <UpdateAvatar
                isEditProfile={false}
                onClickAvatar={() => {
                  setShowAvatar(true);
                }}
                avatarImg={dataUser?.user_avatar}
              />

              <p className="profile__name">{dataUser?.user_displayname}</p>

              <span className="profile__about"></span>
            </div>
          </div>
        </Col>
        <Col md={9}>
          <div className="card h-100 profile__card">
            <div className="card-body">
              <div className="row gutters">
                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                  <h6 className="profile__title">Thông tin cá nhân</h6>
                </div>
                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                  <Input
                    label="Họ và tên"
                    isDisable
                    value={dataUser?.user_displayname}
                    {...register("user_displayname", {
                      required: "Vui lòng nhập họ tên",
                      maxLength: 40,
                    })}
                  />
                </div>
                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                  <Input
                    label="Số điện thoại"
                    type="tel"
                    isDisable
                    value={dataUser?.user_phone}
                    {...register("user_phone", {
                      minLength: 6,
                      maxLength: 12,
                    })}
                  />
                </div>
                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                  <Input
                    label="Địa chỉ"
                    isDisable
                    value={dataUser?.user_address}
                    {...register("user_address")}
                  />
                </div>
              </div>

              <div className="row gutters">
                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                  <h6 className="profile__title">Thông tin vào lớp</h6>
                </div>
                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                  <Input
                    label="Mã số sinh viên"
                    isDisable
                    value={dataUser?.user_studentid}
                    {...register("user_studentid")}
                  />
                </div>
                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                  <Input
                    label="Email"
                    isDisable
                    type="email"
                    value={dataUser?.user_email}
                    {...register("user_email", {
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "invalid email address",
                      },
                    })}
                  />
                </div>
                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                  <Input
                    label="Tên vào lớp"
                    isDisable
                    value={dataUser?.user_nameinroom}
                    {...register("user_nameinroom")}
                  />
                </div>
              </div>

              <div className="profile__groupBtn">
                <Button
                  variant="secondary"
                  className="profile__btn"
                  onClick={handleRedirect}
                >
                  Quay về
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
          className="profile__avatar-modal"
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

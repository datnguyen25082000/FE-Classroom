import React, { useState, useEffect, useRef } from "react";
import "./EditProfile.scss";
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

export const EditProfile = () => {
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

  const handleOnChangeInput = (e: any) => {
    dispatch(doFakeUpdateAvatar(URL.createObjectURL(e.target.files[0])));
    dispatch(doUpdateAvatar({ image: e.target.files[0] }));
  };

  return (
    <div className="edit-profile">
      <Header
        handleAction1={() => setShowCanvas(true)}
        handleAction2={() => setShow(true)}
        handleAction3={() => setShowJoin(true)}
      />

      <Row>
        <Col md={3}>
          <div className="card h-100 edit-profile__card">
            <div className="card-body edit-profile__left">
              <input
                type="file"
                name="user_avatar"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleOnChangeInput}
                ref={refImage}
              />
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

              <p className="edit-profile__name">{dataUser?.user_displayname}</p>

              <span className="edit-profile__about"></span>
            </div>
          </div>
        </Col>
        <Col md={9}>
          <div className="card h-100 edit-profile__card">
            <div className="card-body">
              <div className="row gutters">
                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                  <h6 className="edit-profile__title">
                    Thông tin cá nhân
                  </h6>
                </div>
                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                  <Input
                    label="Họ và tên"
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
                    value={dataUser?.user_address}
                    {...register("user_address")}
                  />
                </div>
              </div>

              <div className="row gutters">
                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                  <h6 className="edit-profile__title">
                    Thông tin vào lớp
                  </h6>
                </div>
                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                  <Input
                    label="Mã số sinh viên"
                    isDisable={dataUser.user_studentid ? true : false}
                    value={dataUser?.user_studentid}
                    {...register("user_studentid")}
                  />
                </div>
                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                  <Input
                    label="Email"
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
                    value={dataUser?.user_nameinroom}
                    {...register("user_nameinroom")}
                  />
                </div>
              </div>

              <div className="edit-profile__groupBtn">
                <Button
                  variant="secondary"
                  className="edit-profile__btn"
                  onClick={handleRedirect}
                >
                  Quay về
                </Button>
                <Button
                  variant="primary"
                  className="edit-profile__btn"
                  onClick={handleSubmit(onSubmit)}
                >
                  Lưu thay đổi
                </Button>

                <Button
                  variant="success"
                  style={{ marginLeft: "auto" }}
                  className="edit-profile__btn"
                  onClick={() => {
                    history.push("/update-password");
                  }}
                >
                  Đổi mật khẩu
                </Button>
              </div>
            </div>
          </div>
        </Col>
      </Row>

      {/* <Row className="edit-profile__knowledge">
        <Col md={12} className="edit-profile__card card">
          <h1>Các khóa học đã tham gia</h1>

          <div className="edit-profile__class">
            <div className="edit-profile__class-name">Khóa học lập trình</div>
          </div>
          <div className="edit-profile__class">
            <div className="edit-profile__class-name">Khóa học lập trình</div>
          </div>
          <div className="edit-profile__class">
            <div className="edit-profile__class-name">Khóa học lập trình</div>
          </div>
        </Col>
      </Row> */}

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
          className="edit-profile__avatar-modal"
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

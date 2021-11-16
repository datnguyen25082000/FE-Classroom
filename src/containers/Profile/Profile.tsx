import React, { useState, useEffect } from "react";
import "./Profile.scss";
import { useAppDispatch, useAppSelector, doGetCurrentUser } from "../../redux";
import { useParams, useHistory } from "react-router";
import { Col, Row, Button } from "react-bootstrap";
import { InputBootstrap, Header } from "../../components/common";
import { UpdateAvatar } from "../../components";
import { ModalAddCourse, OffCanvas, ModalJoinCourse } from "../../components";

export const Profile = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const [show, setShow] = useState(false);
  const [showCanvas, setShowCanvas] = useState(false);
  const [showJoin, setShowJoin] = useState(false);
  const { username } = useParams<{ username: string }>();

  useEffect(() => {}, [username]);

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
              <UpdateAvatar />

              <p className="profile__name">Nguyễn Tấn Đạt</p>

              <span className="profile__about">
                dat qadaldkjadk dlkdja ldkjadlkas daldj dajsdkldj kdljda
                djakdladlakdjasldkas dlkj
              </span>
            </div>
          </div>
        </Col>
        <Col md={9}>
          <div className="card h-100 profile__card">
            <div className="card-body">
              <div className="row gutters">
                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                  <h6 className="mb-2 profile__title">Thông tin cá nhân</h6>
                </div>
                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                  <InputBootstrap label="Họ và tên" />
                </div>
                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                  <InputBootstrap label="Số điện thoại" />
                </div>
                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                  <InputBootstrap label="Địa chỉ" />
                </div>
                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                  <InputBootstrap label="Ngày sinh" />
                </div>
              </div>

              <div className="row gutters">
                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                  <h6 className="mb-2 profile__title">Thông tin vào lớp</h6>
                </div>
                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                  <InputBootstrap label="Mã số sinh viên" />
                </div>
                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                  <InputBootstrap label="Email" />
                </div>
                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                  <InputBootstrap label="Tên hiển thị" />
                </div>
              </div>

              <div className="profile__groupBtn">
                {" "}
                <Button
                  variant="secondary"
                  className="profile__btn"
                  onClick={handleRedirect}
                >
                  Quay về
                </Button>
                <Button
                  variant="primary"
                  className="profile__btn"
                  onClick={handleRedirect}
                >
                  Lưu thay đổi
                </Button>
              </div>
            </div>
          </div>
        </Col>
      </Row>

      <Row className="profile__knowledge">
        <Col md={12} className="profile__card card">
          <h1>Các khóa học đã tham gia</h1>

          <div className="profile__class">
            <div className="profile__class-name">Khóa học lập trình</div>
          </div>
          <div className="profile__class">
            <div className="profile__class-name">Khóa học lập trình</div>
          </div>
          <div className="profile__class">
            <div className="profile__class-name">Khóa học lập trình</div>
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
    </div>
  );
};

import React, { useState, useEffect } from "react";
import { Breadcrumb, Card, Button } from "react-bootstrap";
import { Header, CardClass, Loader } from "../../components/common";
import { useHistory } from "react-router";
import {
  ModalAddCourse,
  OffCanvas,
  ModalJoinCourse,
  CardNotify,
} from "../../components";
import { useAppDispatch, useAppSelector, doGetAllCourse } from "../../redux";
import { SvgEmpty } from "../../constants/images";
import "./Notification.scss";

export const Notifications = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const { listClass, isLoading } = useAppSelector((state) => state.courseSlice);

  const [show, setShow] = useState(false);
  const [showCanvas, setShowCanvas] = useState(false);
  const [showJoin, setShowJoin] = useState(false);
  const [showCollapse, setShowCollapse] = useState(false);

  const handleRedirectClass = (id: number) => {
    history.push(`/classroom/${id}/newsfeed`);
  };

  const joinedCourseHandler = (id: number) => {
    history.push(`/classroom/${id}/newsfeed`);
  };

  useEffect(() => {
    dispatch(doGetAllCourse({}));
  }, []);

  return (
    <div className="notification">
      <Header
        handleAction1={() => setShowCanvas(true)}
        handleAction2={() => setShow(true)}
        handleAction3={() => setShowJoin(true)}
      />

      {isLoading && <Loader />}

      {/* <h1 className='notification__title'>Thông báo</h1> */}

      <div className="box shadow-sm rounded bg-white mb-5">
        <div className="box-title border-bottom p-3">
          <h6 className="m-0 notification__header">Thông báo mới</h6>
        </div>
        <div className="box-body p-0">
          {[1, 2, 3, 4, 5].map((item) => {
            return <CardNotify></CardNotify>;
          })}
        </div>
      </div>
      <div className="box shadow-sm rounded bg-white mb-5">
        <div className="box-title border-bottom p-3">
          <h6 className="m-0 notification__header">Thông báo cũ hơn</h6>
        </div>
        <div className="box-body p-0">
          {[1, 2, 3, 4, 5].map((item) => {
            return <CardNotify></CardNotify>;
          })}
        </div>
      </div>

      {!listClass || !listClass.length ? (
        <div className="home__empty">
          <p>
            Hiện bạn chưa tham gia phòng học nào, vui lòng tạo phòng học mới
          </p>
          <img src={SvgEmpty} alt="" />
        </div>
      ) : (
        <></>
      )}

      <ModalAddCourse show={show} setShow={setShow} />
      <ModalJoinCourse
        show={showJoin}
        setShow={setShowJoin}
        handleAction={joinedCourseHandler}
      />
      <OffCanvas
        show={showCanvas}
        setShow={setShowCanvas}
        handleClose={() => setShowCanvas(false)}
      />
    </div>
  );
};

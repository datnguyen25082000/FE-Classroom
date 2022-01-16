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
import {
  useAppDispatch,
  useAppSelector,
  doGetAllCourse,
  doGetAllNotifications,
  doMarkNotificationAsRead,
  doMarkAllNotificationAsRead,
} from "../../redux";
import { SvgEmpty } from "../../constants/images";
import "./Notification.scss";

export const Notifications = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const { listClass, isLoading } = useAppSelector((state) => state.courseSlice);
  const { listNotifications } = useAppSelector(
    (state) => state.notificationSlice
  );

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

  const handleMarkAsRead = (item: INotification) => {
    dispatch(doMarkNotificationAsRead({ id: item.id }));
  };

  const handleMarkAll = () => {
    dispatch(doMarkAllNotificationAsRead());
  };

  useEffect(() => {
    dispatch(doGetAllCourse({}));
    dispatch(doGetAllNotifications());
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
        <div
          className="box-title border-bottom p-3"
          style={{
            display: "flex",
            alignContent: "center",
            justifyContent: "space-between",
          }}
        >
          <h6 className="m-0 notification__header">Tất cả thông báo</h6>
          <a href="javascript:void(0)" onClick={() => handleMarkAll()}>
            Đánh dấu tất cả đã đọc
          </a>
        </div>
        <div className="box-body p-0">
          {listNotifications && listNotifications.length ? (
            listNotifications.map((item) => {
              return (
                <CardNotify
                  notify={item}
                  onClick={() => handleMarkAsRead(item)}
                ></CardNotify>
              );
            })
          ) : (
            <>
              <div className="home__empty">
                <p>Bạn chưa có thông báo nào.</p>
                <img src={SvgEmpty} alt="" />
              </div>
            </>
          )}
        </div>
      </div>

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

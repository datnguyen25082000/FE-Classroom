import React, { useState, useEffect } from "react";
import "./Home.scss";
import { Breadcrumb, Card, Button } from "react-bootstrap";
import { Header, CardClass, Loader } from "../../components/common";
import { useHistory } from "react-router";
import { ModalAddCourse, OffCanvas, ModalJoinCourse } from "../../components";
import { useAppDispatch, useAppSelector, doGetAllCourse } from "../../redux";
import { SvgEmpty } from "../../constants/images";

export const Home = () => {
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
  }

  useEffect(() => {
    dispatch(doGetAllCourse({}));
  }, []);

  return (
    <div className="home">
      <Header
        handleAction1={() => setShowCanvas(true)}
        handleAction2={() => setShow(true)}
        handleAction3={() => setShowJoin(true)}
      />

      <Breadcrumb>
        <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
        {/* <Breadcrumb.Item active>All class</Breadcrumb.Item> */}
      </Breadcrumb>

      {isLoading && <Loader />}
      <div className="home__list">
        {listClass &&
          listClass.map((item: any) => {
            return (
              <CardClass
                classInfo={item}
                handleAction={() => handleRedirectClass(item.course_id)}
              />
            );
          })}
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
      <ModalJoinCourse show={showJoin} setShow={setShowJoin} handleAction={joinedCourseHandler}/>
      <OffCanvas
        show={showCanvas}
        setShow={setShowCanvas}
        handleClose={() => setShowCanvas(false)}
      />
    </div>
  );
};

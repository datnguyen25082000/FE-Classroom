import React, { useEffect } from "react";
import { Offcanvas } from "react-bootstrap";
import { IDefaultAvatar } from "../../constants/images";
import { useAppSelector, useAppDispatch, doGetAllCourse } from "../../redux";
import { Avatar } from "../common";
import { useHistory } from "react-router";
import { AiFillSetting } from "react-icons/ai";
import { VscReport } from "react-icons/vsc";
import "./OffCanvas.scss";

export const OffCanvas: React.FC<IModalAddCourse> = ({
  show,
  setShow,
  handleClose,
}) => {
  const { dataUser } = useAppSelector((state) => state.userSlice);
  const { listClass } = useAppSelector((state) => state.courseSlice);
  const dispatch = useAppDispatch();
  const history = useHistory();

  const listSection1: any = [];

  const listSection3 = [
    {
      title: "Cài đặt",
      href: "/",
      image: <AiFillSetting size={25} />,
    },
    {
      title: "Gửi phản hồi",
      href: "/",
      image: <VscReport size={25} />,
    },
  ];

  useEffect(() => {
    if (!listClass.length) {
      dispatch(doGetAllCourse({}));
    }
  }, []);

  return (
    <Offcanvas show={show} onHide={handleClose} backdropClassName="off-canvas">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>
          <div className="off-canvas__header">
            <Avatar image={dataUser.user_thumbnail || IDefaultAvatar}></Avatar>
            <span> {dataUser.user_displayname}</span>
          </div>
        </Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <div className="off-canvas__container">
          <div className="off-canvas__title">Lớp đã tham gia</div>
          <div className="off-canvas__list">
            {listSection1 &&
              listSection1.map((item: any, i: any) => {
                return (
                  <div className="off-canvas__item" key={i}>
                    <Avatar
                      image={dataUser.user_thumbnail || IDefaultAvatar}
                    ></Avatar>
                    <span>Lớp Kỹ năng mềm</span>
                  </div>
                );
              })}
          </div>
        </div>
        <div className="off-canvas__container">
          <div className="off-canvas__title">Lớp đang giảng dạy</div>
          <div className="off-canvas__list">
            {listClass &&
              listClass.map((item: any, i: any) => {
                return (
                  <div className="off-canvas__item" key={i}>
                    <Avatar
                      image={item.course_thumbnail || IDefaultAvatar}
                    ></Avatar>
                    <span>{item.course_name}</span>
                  </div>
                );
              })}
          </div>
        </div>
        <div className="off-canvas__container">
          <div className="off-canvas__title">Cài đặt chung</div>
          <div className="off-canvas__list">
            {listSection3.map((item: any, i: any) => {
              return (
                <div
                  className="off-canvas__item"
                  key={i}
                  onClick={() => history.push(`${item.href}`)}
                >
                  {item.image}
                  <span>{item.title}</span>
                </div>
              );
            })}
          </div>
        </div>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

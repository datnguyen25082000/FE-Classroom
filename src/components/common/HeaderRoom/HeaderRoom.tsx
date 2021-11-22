import React, { useState } from "react";
import "./HeaderRoom.scss";
import { AiFillSetting } from "react-icons/ai";
import { GoThreeBars } from "react-icons/go";
import { Avatar, PopupAccount } from "../../common";
import { useAppSelector, useFetchOneCourseQuery } from "../../../redux";
import { IDefaultAvatar } from "../../../constants/images";
import { useLocation, useHistory } from "react-router";

export const HeaderRoom: React.FC<IHeader> = ({
  handleAction1,
  handleAction2,
  handleAction3,
  handleAction4,
  classId,
  className,
}) => {
  const { user_avatar, user_id } = useAppSelector(
    (state) => state.userSlice.dataUser
  );
  const oneCourse = useFetchOneCourseQuery({ courseId: classId }).data;

  const location = useLocation();
  const history = useHistory();
  const [show, setShow] = useState(false);

  const isHost = user_id === oneCourse?.course_hostid ? true : false;

  return (
    <>
      <div className="header-room">
        <div className="header-room__left">
          <div
            className="header-room__i header-room__i-three"
            onClick={handleAction1}
          >
            <GoThreeBars size={25} />
          </div>
          <span className="header-room__app-name">
            {className || "NTD Classroom"}
          </span>
        </div>

        <div className="header-room__center">
          <p
            className={`header-room__item ${
              location.pathname &&
              location.pathname.match(/classroom[^]*newsfeed/)
                ? "header-room__item--active"
                : ""
            }`}
            onClick={() => history.push(`/classroom/${classId}/newsfeed`)}
          >
            Bảng tin
          </p>
          <p
            className={`header-room__item ${
              location.pathname &&
              location.pathname.match(/classroom[^]*practice/)
                ? "header-room__item--active"
                : ""
            }`}
            onClick={() => history.push(`/classroom/${classId}/practice`)}
          >
            Bài tập trên lớp
          </p>
          <p
            className={`header-room__item ${
              location.pathname &&
              location.pathname.match(/classroom[^]*members/)
                ? "header-room__item--active"
                : ""
            }`}
            onClick={() => history.push(`/classroom/${classId}/members`)}
          >
            Mọi người
          </p>
          <p
            className={`header-room__item ${
              location.pathname && location.pathname.match(/classroom[^]*score/)
                ? "header-room__item--active"
                : ""
            }`}
            onClick={() => history.push(`/classroom/${classId}/score`)}
            style={{ display: isHost ? "" : "none" }}
          >
            Số điểm
          </p>
        </div>

        <div className="header-room__right">
          <div
            className="header-room__i header-room__i-plus"
            onClick={() => history.push(`/classroom/${classId}/edit`)}
            style={{ display: isHost ? "" : "none" }}
          >
            <AiFillSetting size={25} />
          </div>

          <Avatar
            image={user_avatar || IDefaultAvatar}
            onClick={(e: any) => {
              e.stopPropagation();
              setShow(!show);
            }}
          ></Avatar>
        </div>
      </div>

      <PopupAccount
        show={show}
        handleClose={() => setShow(false)}
        className="header-room__popup"
      />
    </>
  );
};

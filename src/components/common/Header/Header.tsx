import React, { useState } from "react";
import "./Header.scss";
import { AiOutlinePlus } from "react-icons/ai";
import { GoThreeBars, GoSettings } from "react-icons/go";
import { IoIosNotificationsOutline } from "react-icons/io";
import { GiExitDoor } from "react-icons/gi";
import { Avatar, PopupAccount, PopupNotify } from "../../common";
import { useAppSelector } from "../../../redux";
import { IDefaultAvatar } from "../../../constants/images";

export const Header: React.FC<IHeader> = ({
  handleAction1,
  handleAction2,
  handleAction3,
  handleAction4,
}) => {
  const { user_avatar } = useAppSelector((state) => state.userSlice.dataUser);
  const [show, setShow] = useState(false);
  const [showNoti, setShowNoti] = useState(false);

  return (
    <>
      <div className="header">
        <div className="header__left">
          <div className="header__i header__i-three" onClick={handleAction1}>
            <GoThreeBars size={25} />
          </div>
          <span className="header__app-name">NTD Classroom</span>
        </div>
        <div className="header__right">
          <div className="header__i header__i-plus" onClick={handleAction2}>
            <AiOutlinePlus size={25} />
          </div>
          <div className="header__i header__i-exit" onClick={handleAction3}>
            <GiExitDoor size={25} />
          </div>

          <div
            className="header__i header__i-notify"
            style={{ position: "relative" }}
            
          >
            <IoIosNotificationsOutline size={25} />

            <div className="header__i--number">
              <span>99</span>
            </div>

            <PopupNotify
              show={showNoti}
              setShow={setShowNoti}
              handleClose={() => setShow(false)}
              className="header__popup"
            />
          </div>

          <div style={{ position: "relative" }}>
            <Avatar
              image={user_avatar || IDefaultAvatar}
              onClick={(e: any) => {
                e.stopPropagation();
                setShow(!show);
              }}
            ></Avatar>
            <PopupAccount
              show={show}
              setShow={setShow}
              handleClose={() => setShow(false)}
              className="header__popup"
            />
          </div>
        </div>
      </div>
    </>
  );
};

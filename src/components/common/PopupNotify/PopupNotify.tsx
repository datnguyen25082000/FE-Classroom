import React, { useEffect, useRef } from "react";
import "./PopupNotify.scss";
import { AiFillSetting, AiOutlineLogout } from "react-icons/ai";
import { BiUserPin } from "react-icons/bi";
import { logout } from "../../../helpers";
import { useHistory } from "react-router";
import { useAppSelector } from "../../../redux";

export const PopupNotify: React.FC<IModalCenter> = ({
  show,
  top,
  left,
  className,
  handleClose,
  setShow,
}) => {
  const history = useHistory();
  const ref = useRef<HTMLDivElement>(null);
  // const { user_id } = useAppSelector((state) => state.userSlice.dataUser);

  useEffect(() => {
    if (show) {
      const handleClickOutside = (event: any) => {
        if (ref.current && ref.current.contains(event.target)) {
        } else {
          if (handleClose) {
            handleClose();
          }
        }
      };
      document.addEventListener("click", handleClickOutside);
      return () => {
        document.removeEventListener("click", handleClickOutside);
      };
    }
  }, [ref, show, document]);

  const handleRedirectProfile = () => {
    history.push(`/edit-profile`);
    if (setShow) setShow(false);
  };

  return (
    <div
      className={`popup-notify ${className} ${
        show ? "popup-notify--show" : ""
      }`}
      style={{ top, left }}
      ref={ref}
    >
      <div className="popup-notify__list">
        <div className="popup-notify-cover__arrow">
          <div className="popup-notify__arr"></div>
        </div>
        <div
          className="popup-notify__item"
          onClick={() => handleRedirectProfile()}
        >
          <BiUserPin size={20} />
          <span>Thông tin cá nhân</span>
        </div>
        <div className="popup-notify__item">
          <AiFillSetting size={20} />
          <span>Cài đặt</span>
        </div>
        <div className="popup-notify__item" onClick={() => logout()}>
          <AiOutlineLogout size={20} />
          <span> Đăng xuất</span>
        </div>
      </div>
    </div>
  );
};

import React, { useEffect, useRef } from "react";
import "./PopupNotify.scss";
import { AiFillSetting, AiOutlineLogout } from "react-icons/ai";
import { BiUserPin } from "react-icons/bi";
import { logout } from "../../../helpers";
import { useHistory } from "react-router";
import { useAppSelector } from "../../../redux";
import { CardNotify } from "../../CardNotify/CardNotify";
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
          setShow(false);
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
        {[1, 2, 3, 4, 5].map((item, i) => {
          return (
            <div className="popup-notify__item" key={i}>
              <CardNotify showMore={false} />
            </div>
          );
        })}
      </div>{" "}
      <div className="popup-notify__more">
        <a href="/notifications">Xem tất cả</a>
      </div>
    </div>
  );
};

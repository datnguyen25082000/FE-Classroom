import React, { useEffect, useRef } from "react";
import "./PopupNotify.scss";
import { AiFillSetting, AiOutlineLogout } from "react-icons/ai";
import { BiUserPin } from "react-icons/bi";
import { logout } from "../../../helpers";
import { useHistory } from "react-router";
import {
  useAppDispatch,
  useAppSelector,
  doGetAllCourse,
  doGetAllNotifications,
  doMarkNotificationAsRead,
} from "../../../redux";
import { CardNotify } from "../../CardNotify/CardNotify";
import { SvgEmpty } from "../../../constants/images";

export const PopupNotify: React.FC<IModalCenter> = ({
  show,
  top,
  left,
  className,
  handleClose,
  setShow,
}) => {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const { listNotifications } = useAppSelector(
    (state) => state.notificationSlice
  );
  const ref = useRef<HTMLDivElement>(null);

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

  const handleMarkAsRead = (item: INotification) => {
    dispatch(doMarkNotificationAsRead({ id: item.id }));
  };

  // useEffect(() => {
  //   dispatch(doGetAllNotifications());
  // }, []);

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
        {listNotifications && listNotifications.length ? (
          listNotifications.map((item, i) => {
            return (
              <div className="popup-notify__item" key={i}>
                <CardNotify
                  showMore={false}
                  notify={item}
                  onClick={() => {
                    handleMarkAsRead(item);
                    history.push("/notifications");
                  }}
                />
              </div>
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
      </div>{" "}
      <div className="popup-notify__more">
        <a href="/notifications">Xem tất cả</a>
      </div>
    </div>
  );
};

import React, { Fragment } from "react";
import "./UpdateAvatar.scss";
import { Avatar } from "../../common";
import { AiOutlineCamera } from "react-icons/ai";
import { IDefaultAvatar } from "../../../constants/images";

export const UpdateAvatar: React.FC<IUpdateAvatar> = ({
  avatarImg = IDefaultAvatar,
  isEditProfile,
  className,
  onClick,
}) => {
  return (
    <div className={`updateAvatar ${className}`}>
      {!avatarImg ? (
        isEditProfile ? (
          <Fragment>
            <Avatar className="updateAvatar__ava" />
            <div className="updateAvatar__empty">
              <span className="updateAvatar__text">Logo công ty</span>
            </div>
          </Fragment>
        ) : (
          <Fragment>
            <Avatar className="updateAvatar__ava" />
            <div className="updateAvatar__emptyDetail"></div>
          </Fragment>
        )
      ) : (
        <Avatar className="updateAvatar__ava" image={avatarImg} />
      )}

      <div className="updateAvatar__editAvatarImage" onClick={onClick}>
        <AiOutlineCamera color="#000" size={20} />
      </div>
    </div>
  );
};

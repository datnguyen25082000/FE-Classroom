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
  onClickAvatar,
}) => {
  return (
    <div className={`updateAvatar ${className}`}>
      {!avatarImg ? (
        isEditProfile ? (
          <Fragment>
            <Avatar
              className="updateAvatar__ava"
              image={avatarImg || IDefaultAvatar}
              onClick={onClickAvatar}
            />
            <div className="updateAvatar__empty">
              <span className="updateAvatar__text">Ảnh đại diện</span>
            </div>
          </Fragment>
        ) : (
          <Fragment>
            <Avatar
              className="updateAvatar__ava"
              image={avatarImg || IDefaultAvatar}
              onClick={onClickAvatar}
            />
            <div className="updateAvatar__emptyDetail"></div>
          </Fragment>
        )
      ) : (
        <Avatar
          className="updateAvatar__ava"
          onClick={onClickAvatar}
          image={avatarImg || IDefaultAvatar}
        />
      )}

      <div className="updateAvatar__editAvatarImage" onClick={onClick}>
        <AiOutlineCamera color="#000" size={20} />
      </div>
    </div>
  );
};

import React from "react";
import "./Avatar.scss";
import { IDefaultAvatar } from "../../../constants/images";

export const Avatar: React.FC<IAvatar> = ({ image, onClick, className }) => {
  return (
    <div className={`avatar ${className}`} onClick={onClick}>
      <img src={image || IDefaultAvatar} alt="Image" />
    </div>
  );
};

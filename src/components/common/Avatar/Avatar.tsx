import React from "react";
import "./Avatar.scss";

export const Avatar: React.FC<IAvatar> = ({ image, onClick, className }) => {
  return (
    <div className={`avatar ${className}`} onClick={onClick}>
      <img src={image} alt="Image" />
    </div>
  );
};

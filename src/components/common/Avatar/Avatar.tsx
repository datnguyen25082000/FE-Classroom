import React from 'react';
import './Avatar.scss';

export const Avatar: React.FC<IAvatar> = ({ image, onClick }) => {
  return (
    <div className="avatar" onClick={onClick}>
      <img src={image} alt="Image" />
    </div>
  );
};

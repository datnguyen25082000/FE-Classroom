import React, { useEffect, useRef } from 'react';
import './PopupAccount.scss';
import { AiFillSetting, AiOutlineLogout } from 'react-icons/ai';
import { BiUserPin } from 'react-icons/bi';
import { logout } from '../../../helpers';

export const PopupAccount: React.FC<IModalCenter> = ({
  show,
  top,
  left,
  className,
  handleClose,
}) => {
  const ref = useRef<HTMLDivElement>(null);

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
      document.addEventListener('click', handleClickOutside);
      return () => {
        document.removeEventListener('click', handleClickOutside);
      };
    }
  }, [ref, show, document]);

  return (
    <div
      className={`popup-account ${className} ${show ? 'popup-account--show' : ''}`}
      style={{ top, left }}
      ref={ref}
    >
      <div className="popup-account__list">
        <div className="popup-account-cover__arrow">
          <div className="popup-account__arr"></div>
        </div>
        <div className="popup-account__item">
          <BiUserPin size={20} />
          <span>Thông tin cá nhân</span>
        </div>
        <div className="popup-account__item">
          <AiFillSetting size={20} />
          <span>Cài đặt</span>
        </div>
        <div className="popup-account__item" onClick={() => logout()}>
          <AiOutlineLogout size={20} />
          <span> Đăng xuất</span>
        </div>
      </div>
    </div>
  );
};

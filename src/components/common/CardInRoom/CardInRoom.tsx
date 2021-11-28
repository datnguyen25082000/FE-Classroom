import React from "react";
import "./CardInRoom.scss";
import { Popover, OverlayTrigger, Button, Modal } from "react-bootstrap";
import { FiMoreVertical } from "react-icons/fi";

export const CardInRoom: React.FC<ICardInRoom> = ({
  title,
  children,
  handleClickMore,
  popover,
  isHost,
}) => {
  return (
    <div className="card-in-room">
      <div className="card-in-room__header">
        <p className="card-in-room__title">{title}</p>
        {isHost && (
          <div className="card-in-room__icon">
            <OverlayTrigger
              trigger="click"
              placement="bottom"
              overlay={popover}
              rootClose
            >
              <div onClick={handleClickMore}>
                {<FiMoreVertical size={20} />}
              </div>
            </OverlayTrigger>
          </div>
        )}
      </div>
      {children}
    </div>
  );
};

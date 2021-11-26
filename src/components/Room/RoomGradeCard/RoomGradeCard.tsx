import React from "react";
import "./RoomGradeCard.scss";
import { CardInRoom } from "../../common";
import { Popover } from "react-bootstrap";
import { useHistory } from "react-router";

export const RoomGradeCard: React.FC<IRoomGradeCard> = ({ roomId }) => {
  const history = useHistory();
  const popover = (
    <Popover
      id="popover-basic"
      // style={{ display: showOverlay ? "block" : "none" }}
    >
      <Popover.Header as="h3">Tùy chọn</Popover.Header>
      <Popover.Body>
        <div className="card-student__item" onClick={() => handleClickItem()}>
          <span>Chỉnh sửa cơ cấu điểm</span>
        </div>
      </Popover.Body>
    </Popover>
  );

  const handleClickItem = () => {
    history.push(`/classroom/${roomId}/grading-structure`);
  };

  return (
    <div className="room-grade-card">
      <CardInRoom title="Cơ cấu tính điểm" popover={popover}>
        <div className="room-grade-card__item">
          <span className="room-grade-card__left">Giữa kì:</span>
          <span className="room-grade-card__right">20%</span>
        </div>
        <div className="room-grade-card__item">
          <span className="room-grade-card__left">Cuối kì:</span>
          <span className="room-grade-card__right">20%</span>
        </div>
        <div className="room-grade-card__item">
          <span className="room-grade-card__left">Thực hành:</span>
          <span className="room-grade-card__right">20%</span>
        </div>
        <div className="room-grade-card__item">
          <span className="room-grade-card__left">Đồ án:</span>
          <span className="room-grade-card__right">40%</span>
        </div>
      </CardInRoom>
    </div>
  );
};

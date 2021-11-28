import React from "react";
import "./RoomGradeCard.scss";
import { CardInRoom } from "../../common";
import { Popover } from "react-bootstrap";
import { useHistory } from "react-router";

export const RoomGradeCard: React.FC<IRoomGradeCard> = ({
  roomId,
  listAssign,
  isHost,
}) => {
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
      <CardInRoom title="Cơ cấu tính điểm" popover={popover} isHost={isHost}>
        {listAssign && listAssign.length ? (
          listAssign.map((item, i) => {
            return (
              <div className="room-grade-card__item" key={i}>
                <span className="room-grade-card__left">{item.name}</span>
                <span className="room-grade-card__right">{item.point} điểm</span>
              </div>
            );
          })
        ) : (
          <span>Chưa có cơ cấu điểm</span>
        )}
      </CardInRoom>
    </div>
  );
};

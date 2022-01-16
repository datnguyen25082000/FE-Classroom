import React, { useState } from "react";
import { CardReview2 } from "../CardReview2/CardReview2";
import { CardNotify } from "../CardNotify/CardNotify";
import { Button, Collapse, Card } from "react-bootstrap";
import "./ReviewItem.scss";
import { Avatar } from "../common";

interface IReviewItem {
  reviewItem: IScoreReviewItem;
}
export const ReviewItem: React.FC<IReviewItem> = ({ reviewItem }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="review-item">
      <Card
        onClick={() => setOpen(!open)}
        aria-controls="example-collapse-text"
        aria-expanded={open}
      >
        <Card.Header className="review-item__header">
          <div className="p-3 d-flex align-items-center  border-bottom osahan-post-header">
            <div
              className="dropdown-list-image"
              style={{ marginRight: "12px" }}
            >
              <Avatar />
            </div>
            <div className="font-weight-bold mr-3" style={{ flex: "1" }}>
              <div
                className="text-truncate font-weight-bold"
                style={{ fontWeight: 500 }}
              >
                {reviewItem.student_id} -{" "}
                {"Phúc khảo cột điểm " + reviewItem.assignment_name}
              </div>
              <div className="small">{reviewItem.reason}</div>
            </div>
            {/* <span className="ml-auto mb-auto">
              <div className="btn-group">
                <div className="dropdown-menu dropdown-menu-right">
                  <button className="dropdown-item" type="button">
                    <i className="mdi mdi-delete"></i> Delete
                  </button>
                  <button className="dropdown-item" type="button">
                    <i className="mdi mdi-close"></i> Turn Off
                  </button>
                </div>
              </div>
              <br />
              <div className="text-right text-muted pt-1">3d</div>
            </span> */}
          </div>
        </Card.Header>
      </Card>
      <Collapse in={open}>
        <div id="example-collapse-text">
          <CardReview2 column={reviewItem} isTeacherView={true} isShow={open} />
        </div>
      </Collapse>
    </div>
  );
};

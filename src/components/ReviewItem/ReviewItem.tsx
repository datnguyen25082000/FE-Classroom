import React, { useState } from "react";
import { CardReview } from "../CardReview/CardReview";
import { CardNotify } from "../CardNotify/CardNotify";
import { Button, Collapse, Card } from "react-bootstrap";
import "./ReviewItem.scss";
export const ReviewItem = () => {
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
              <img
                className="rounded-circle"
                src="https://bootdey.com/img/Content/avatar/avatar3.png"
                alt=""
              />
            </div>
            <div className="font-weight-bold mr-3" style={{ flex: "1" }}>
              <div className="text-truncate">DAILY RUNDOWN: WEDNESDAY</div>
              <div className="small">
                Income tax sops on the cards, The bias in VC funding, and other
                top news for you
              </div>
            </div>
            <span className="ml-auto mb-auto">
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
            </span>
          </div>
        </Card.Header>
      </Card>
      <Collapse in={open}>
        <div id="example-collapse-text">
          <CardReview />
        </div>
      </Collapse>
    </div>
  );
};

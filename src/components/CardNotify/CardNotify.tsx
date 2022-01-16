import React from "react";
import "./CardNotify.scss";
import { transformDatetimeFormat } from "../../helpers/time";
import { Avatar } from "../common";
interface ICardNotify {
  showMore?: boolean;
  onClick?: any;
  notify?: INotification;
}
export const CardNotify: React.FC<ICardNotify> = ({
  showMore = true,
  onClick,
  notify,
}) => {
  return (
    <div
      className={`card-notify bg-light ${
        notify?.isRead ? "" : "card-notify__unread"
      }`}
      onClick={onClick}
    >
      <div className="p-3 d-flex align-items-center  border-bottom osahan-post-header">
        {/* <div className="dropdown-list-image" style={{ marginRight: "12px" }}>
          <Avatar />
        </div> */}
        <div className="font-weight-bold mr-3" style={{ flex: "1" }}>
          {/* <div className="text-truncate">DAILY RUNDOWN: WEDNESDAY</div> */}
          <div className="">{notify?.content}</div>
        </div>
        <span className="ml-auto mb-auto p-3">
          {/* <div className="btn-group">
            {showMore && (
              <button
                type="button"
                className="btn btn-light btn-sm rounded"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <i className="mdi mdi-dots-vertical"></i>
              </button>
            )}
            <div className="dropdown-menu dropdown-menu-right">
              <button className="dropdown-item" type="button">
                <i className="mdi mdi-delete"></i> Delete
              </button>
              <button className="dropdown-item" type="button">
                <i className="mdi mdi-close"></i> Turn Off
              </button>
            </div>
          </div> */}
          {/* <br /> */}
          <div className="text-right text-muted pt-1">
            {transformDatetimeFormat(notify?.created_at || "")}
          </div>
        </span>
      </div>
    </div>
  );
};

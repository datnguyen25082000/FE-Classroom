import React from "react";
import "./CardNotify.scss";

interface ICardNotify {
  showMore?: boolean;
  onClick?: any;
}
export const CardNotify: React.FC<ICardNotify> = ({
  showMore = true,
  onClick,
}) => {
  return (
    <div className="card-notify bg-light" onClick={onClick}>
      <div className="p-3 d-flex align-items-center  border-bottom osahan-post-header">
        <div className="dropdown-list-image" style={{ marginRight: "12px" }}>
          <img
            className="rounded-circle"
            src="https://bootdey.com/img/Content/avatar/avatar3.png"
            alt=""
          />
        </div>
        <div className="font-weight-bold mr-3" style={{ flex: "1" }}>
          <div className="text-truncate">DAILY RUNDOWN: WEDNESDAY</div>
          <div className="small">
            Income tax sops on the cards, The bias in VC funding, and other top
            news for you
          </div>
        </div>
        <span className="ml-auto mb-auto">
          <div className="btn-group">
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
          </div>
          <br />
          <div className="text-right text-muted pt-1">3d</div>
        </span>
      </div>
    </div>
  );
};

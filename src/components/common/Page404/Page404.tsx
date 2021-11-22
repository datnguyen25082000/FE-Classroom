import React from "react";
import "./Page404.scss";
import { Svg404 } from "../../../constants/images";
import { Button } from "react-bootstrap";
import { useHistory } from "react-router";
export const Page404 = () => {
  const history = useHistory();

  return (
    <div className="page-404">
      <span className="page-404__app-name">NTD Classroom</span>
      <div className="page-404__body">
        <img src={Svg404} alt="" />
        <div className="page-404__content">
          <span>Không tìm thấy trang</span>{" "}
          <Button onClick={() => history.push("/")} variant="success">
            Quay về trang chủ
          </Button>
        </div>
      </div>
    </div>
  );
};

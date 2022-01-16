import React, { useState, useEffect } from "react";
import { Header, Page404 } from "../../components/common";
import { Button } from "react-bootstrap";
import { useLocation, useHistory } from "react-router-dom";
import "./Admin.scss";
import {
  ManageAdmin,
  ManageClass,
  ManageUser,
  DetailUser,
  DetailClass,
} from "../../components";
import { useAppSelector } from "../../redux";

export const Admin = () => {
  const location = useLocation();
  const history = useHistory();
  const [screen, setScreen] = useState(0);
  const { dataUser } = useAppSelector((state) => state.userSlice);

  useEffect(() => {
    if (location.pathname === "/admin/home") setScreen(1);
    if (location.pathname === "/admin/manage-user") setScreen(2);
    if (location.pathname === "/admin/manage-class") setScreen(3);
    if (location.pathname.includes("/admin/detail-user/")) setScreen(4);
    if (location.pathname.includes("/admin/detail-class/")) setScreen(5);
  }, [location]);

  const handleClickSidebar = (num: number) => {
    setScreen(num);

    if (num === 1) {
      history.push("/admin/home");
    }
    if (num === 2) {
      history.push("/admin/manage-user");
    }
    if (num === 3) {
      history.push("/admin/manage-class");
    }
  };

  const renderBody = () => {
    switch (screen) {
      case 1:
        return <ManageAdmin />;
      case 2:
        return <ManageUser />;
      case 3:
        return <ManageClass />;
      case 4:
        return <DetailUser />;
      case 5:
        return <DetailClass />;
      default:
        return <ManageAdmin />;
    }
  };

  if (dataUser && dataUser?.user_username) {
    return <Page404 />;
  }

  return (
    <div className="admin-home">
      <Header isAdminHeader={true}></Header>
      <div className="admin-home__container">
        <div className="admin-home__left">
          <span
            className={`admin-home__button ${
              screen === 1 ? "admin-home__button--active" : ""
            }`}
            onClick={() => handleClickSidebar(1)}
          >
            Quản lý admin
          </span>
          <span
            className={`admin-home__button ${
              screen === 2 ? "admin-home__button--active" : ""
            }`}
            onClick={() => handleClickSidebar(2)}
          >
            Quản lý người dùng
          </span>
          <span
            className={`admin-home__button ${
              screen === 3 ? "admin-home__button--active" : ""
            }`}
            onClick={() => handleClickSidebar(3)}
          >
            Quản lý lớp học
          </span>
        </div>
        <div className="admin-home__right">{renderBody()}</div>
      </div>
    </div>
  );
};

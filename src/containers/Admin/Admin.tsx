import React, { useState, useEffect } from "react";
import { Header } from "../../components/common";
import { Button } from "react-bootstrap";
import { useLocation, useHistory } from "react-router-dom";
import "./Admin.scss";
import { ManageAdmin, ManageClass, ManageUser } from "../../components";

export const Admin = () => {
  const location = useLocation();
  const history = useHistory();
  const [screen, setScreen] = useState(0);

  useEffect(() => {
    if (location.pathname === "/admin/home") setScreen(1);
    if (location.pathname === "/admin/manage-user") setScreen(2);
    if (location.pathname === "/admin/manage-class") setScreen(3);
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

      default:
        return <ManageAdmin />;
    }
  };

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

import React, { useEffect } from "react";
import { Route } from "react-router-dom";
import { useAppDispatch } from "../redux/store";
import { EToken } from "../constants";
import { logout } from "../helpers";

export const PrivateRouter: React.FC<IPrivateRouter> = ({
  component: Component,
  layout: Layout,
  exact,
  path,
  hideNavbar,
}) => {
  const dispatch = useAppDispatch();
  const Header = Component.Header ?? <></>;
  const Footer = Component.Footer ?? <></>;

  const tokenLogin = window.localStorage.getItem(EToken.loginToken);

  return (
    <Route
      exact={exact}
      path={path}
      render={(props) => {
        if (!tokenLogin || tokenLogin === "undefined") {
          logout();
        } else
          return (
            <Layout hideNavbar={hideNavbar} header={Header} footer={Footer}>
              <Component {...props} />
            </Layout>
          );
      }}
    />
  );
};

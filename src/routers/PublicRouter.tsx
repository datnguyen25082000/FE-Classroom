import React, { useEffect } from 'react';
import { Route } from 'react-router-dom';
import { useAppDispatch } from '../redux/store';
import { EToken } from '../constants';
import { logout } from '../helpers';

export const PublicRouter: React.FC<IPrivateRouter> = ({
  component: Component,
  layout: Layout,
  exact,
  path,
  hideNavbar,
}) => {
  const dispatch = useAppDispatch();
  const Header = Component.Header ?? <></>;
  const Footer = Component.Footer ?? <></>;

  return (
    <Route
      exact={exact}
      path={path}
      render={(props) => {
        return (
          <Layout hideNavbar={hideNavbar} header={Header} footer={Footer}>
            <Component {...props} />
          </Layout>
        );
      }}
    />
  );
};

import React from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import { Home, Login, Room } from '../containers';
import { PrivateRouter } from './PrivateRouter';
import { PublicRouter } from './PublicRouter';
import {
  BlankLayout,
  HeaderFooterLayout,
  OnlyFooterLayout,
  OnlyHeaderLayout,
  FullLayout,
} from '../layouts';

import { Header, Footer } from '../components/common';

export const Routers = () => {
  return (
    <Router>
      <Switch>
        <PrivateRouter exact={true} path={'/'} component={Home} layout={BlankLayout} />
        <PrivateRouter
          exact={true}
          path={'/classroom/:classId'}
          component={Room}
          layout={BlankLayout}
        />
        <PublicRouter exact={true} path={'/login'} component={Login} layout={FullLayout} />
      </Switch>
    </Router>
  );
};

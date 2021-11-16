import React from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import {
  ForgotPass,
  Home,
  Login,
  Profile,
  ResetPass,
  Room,
  RoomEdit,
  RoomMember,
  RoomPractice,
  RoomScore,
} from "../containers";
import { PrivateRouter } from "./PrivateRouter";
import { PublicRouter } from "./PublicRouter";
import {
  BlankLayout,
  HeaderFooterLayout,
  OnlyFooterLayout,
  OnlyHeaderLayout,
  FullLayout,
} from "../layouts";

import { Header, Footer } from "../components/common";

export const Routers = () => {
  return (
    <Router>
      <Switch>
        <PrivateRouter
          exact={true}
          path={"/"}
          component={Home}
          layout={BlankLayout}
        />
        <PrivateRouter
          exact={true}
          path={"/classroom/:classId/newsfeed"}
          component={Room}
          layout={BlankLayout}
        />
        <PrivateRouter
          exact={true}
          path={"/classroom/:classId/members"}
          component={RoomMember}
          layout={FullLayout}
        />
        <PrivateRouter
          exact={true}
          path={"/classroom/:classId/practice"}
          component={RoomPractice}
          layout={BlankLayout}
        />
        <PrivateRouter
          exact={true}
          path={"/classroom/:classId/score"}
          component={RoomScore}
          layout={BlankLayout}
        />
        <PrivateRouter
          exact={true}
          path={"/classroom/:classId/edit"}
          component={RoomEdit}
          layout={BlankLayout}
        />
        <PublicRouter
          exact={true}
          path={"/login"}
          component={Login}
          layout={FullLayout}
        />
        <PublicRouter
          exact={true}
          path={"/profile/:username"}
          component={Profile}
          layout={BlankLayout}
        />
        <PublicRouter
          exact={true}
          path={"/forgot-password"}
          component={ForgotPass}
          layout={FullLayout}
        />
        <PublicRouter
          exact={true}
          path={"/reset-password"}
          component={ResetPass}
          layout={FullLayout}
        />
      </Switch>
    </Router>
  );
};

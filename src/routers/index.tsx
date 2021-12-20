import React from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import {
  EditProfile,
  ForgotPass,
  GradingStructure,
  Home,
  Login,
  ResetPass,
  Room,
  RoomEdit,
  RoomJoin,
  RoomMember,
  RoomPractice,
  RoomScore,
  StudentScore,
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
          path={"/classroom/join/:invitationCode"}
          component={RoomJoin}
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
          layout={FullLayout}
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
          path={"/edit-profile"}
          component={EditProfile}
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
        <PrivateRouter
          exact={true}
          path={"/classroom/:classId/grading-structure"}
          component={GradingStructure}
          layout={BlankLayout}
        />

        <PrivateRouter
          exact={true}
          path={"/classroom/:classId/student-score"}
          component={StudentScore}
          layout={FullLayout}
        />
      </Switch>
    </Router>
  );
};

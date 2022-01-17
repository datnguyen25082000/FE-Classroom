import React from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import {
  Admin,
  EditProfile,
  ForgotPass,
  GradingStructure,
  Home,
  Login,
  Notifications,
  Profile,
  UpdatePass,
  Room,
  RoomEdit,
  RoomJoin,
  RoomMember,
  RoomPractice,
  RoomScore,
  StudentScore,
  ReviewList,
  InvaliAccount,
  LoginAdmin,
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

        <PublicRouter
          exact={true}
          path={"/account-active"}
          component={InvaliAccount}
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
        <PrivateRouter
          exact={true}
          path={"/classroom/:classId/review-list"}
          component={ReviewList}
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
          path={"/admin/login"}
          component={LoginAdmin}
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
          path={"/update-password"}
          component={UpdatePass}
          layout={BlankLayout}
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

        <PrivateRouter
          exact={true}
          path={"/profile/:userId"}
          component={Profile}
          layout={BlankLayout}
        />

        <PrivateRouter
          exact={true}
          path={"/notifications"}
          component={Notifications}
          layout={BlankLayout}
        />

        <PrivateRouter
          exact={true}
          path={"/admin/home"}
          component={Admin}
          layout={FullLayout}
        />

        <PrivateRouter
          exact={true}
          path={"/admin/manage-user"}
          component={Admin}
          layout={FullLayout}
        />

        <PrivateRouter
          exact={true}
          path={"/admin/manage-class"}
          component={Admin}
          layout={FullLayout}
        />

        <PrivateRouter
          exact={true}
          path={"/admin/detail-admin/:id"}
          component={Admin}
          layout={FullLayout}
        />

        <PrivateRouter
          exact={true}
          path={"/admin/detail-user/:id"}
          component={Admin}
          layout={FullLayout}
        />

        <PrivateRouter
          exact={true}
          path={"/admin/detail-class/:id"}
          component={Admin}
          layout={FullLayout}
        />
      </Switch>
    </Router>
  );
};

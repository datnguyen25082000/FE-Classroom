import { combineReducers } from "@reduxjs/toolkit";

import modalSlice from "../slice/appSlice/modalSlice";
import courseSlice from "../slice/apiSlice/course";
import courseJoinSlice from "../slice/apiSlice/course-join";
import authSlice from "../slice/apiSlice/auth";
import userSlice from "../slice/apiSlice/user";
import assignCateSlice from "../slice/apiSlice/assign-cate";
import scoreSlice from "../slice/apiSlice/score";
import courseStudentSlice from "../slice/apiSlice/course-student";
import scoreReviewSlice from "../slice/apiSlice/score-review";
import reviewCommentSlice from "../slice/apiSlice/review-comment";
import notificationSlice from "../slice/apiSlice/notification";
import adminSlice from "../slice/apiSlice/admin";
import { courseApi } from "../apis";

export const rootReducer = combineReducers({
  [courseApi.reducerPath]: courseApi.reducer,
  modalSlice,
  courseSlice,
  authSlice,
  userSlice,
  courseJoinSlice,
  assignCateSlice,
  scoreSlice,
  courseStudentSlice,
  scoreReviewSlice,
  reviewCommentSlice,
  notificationSlice,
  adminSlice,
});
export type RootState = ReturnType<typeof rootReducer>;

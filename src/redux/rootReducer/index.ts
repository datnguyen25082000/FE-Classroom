import { combineReducers } from '@reduxjs/toolkit';

import modalSlice from '../slice/appSlice/modalSlice';
import courseSlice from '../slice/apiSlice/course';
import courseJoinSlice from '../slice/apiSlice/course-join';
import authSlice from '../slice/apiSlice/auth';
import userSlice from '../slice/apiSlice/user';

export const rootReducer = combineReducers({
  modalSlice,
  courseSlice,
  authSlice,
  userSlice,
  courseJoinSlice
});
export type RootState = ReturnType<typeof rootReducer>;

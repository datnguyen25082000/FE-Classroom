import { combineReducers } from '@reduxjs/toolkit';

import modalSlice from '../slice/appSlice/modalSlice';
import courseSlice from '../slice/apiSlice/course';
import authSlice from '../slice/apiSlice/auth';
import userSlice from '../slice/apiSlice/user';

export const rootReducer = combineReducers({
  modalSlice,
  courseSlice,
  authSlice,
  userSlice,
});
export type RootState = ReturnType<typeof rootReducer>;

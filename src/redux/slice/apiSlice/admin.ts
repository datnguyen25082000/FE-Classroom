import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import {
  doGetAllAdmin,
  doAddAdmin,
  doGetAllUser,
  doUpdateStudentId,
  doLockUser,
  doGetAllCourseSystem,
} from "../../asyncActions";

const initialState = {
  isLoading: false,
  error: {},
  listAdmin: [],
  listUser: [],
  listCourse: [],
} as ISliceAdmin;

const slice = createSlice({
  name: "admin@",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    //admin
    builder.addCase(doGetAllAdmin.pending, (state) => {
      state.error = null;
      state.isLoading = true;
      state.listAdmin = [];
    });

    builder.addCase(
      doGetAllAdmin.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.listAdmin = action.payload.content;
      }
    );

    builder.addCase(doGetAllAdmin.rejected, (state, action) => {
      const error = action.error;
      state.error = error;
      state.isLoading = false;
    });

    // user
    builder.addCase(doGetAllUser.pending, (state) => {
      state.error = null;
      state.isLoading = true;
      state.listUser = [];
    });

    builder.addCase(
      doGetAllUser.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.listUser = action.payload.content;
      }
    );

    builder.addCase(doGetAllUser.rejected, (state, action) => {
      const error = action.error;
      state.error = error;
      state.isLoading = false;
    });

    // course
    builder.addCase(doGetAllCourseSystem.pending, (state) => {
      state.error = null;
      state.isLoading = true;
      state.listCourse = [];
    });

    builder.addCase(
      doGetAllCourseSystem.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.listCourse = action.payload.content;
      }
    );

    builder.addCase(doGetAllCourseSystem.rejected, (state, action) => {
      const error = action.error;
      state.error = error;
      state.isLoading = false;
    });
  },
});

const { reducer: adminReducer, actions } = slice;
// export const { doFakeUpdateAvatar } = actions;
export default adminReducer;

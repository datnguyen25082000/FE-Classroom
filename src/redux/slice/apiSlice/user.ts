import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { doGetCurrentUser, doGetUserInfo } from "../../asyncActions";

const initialState = {
  dataUser: {},
  userInfo: {},
  isLoading: false,
  error: {},
} as ISliceUser;

const slice = createSlice({
  name: "user@",
  initialState: initialState,
  reducers: {
    doFakeUpdateAvatar(state, action: any) {
      state.dataUser.user_avatar = action.payload;
      state.userInfo.user_avatar = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(doGetCurrentUser.pending, (state) => {
      state.error = null;
      state.isLoading = true;
    });

    builder.addCase(
      doGetCurrentUser.fulfilled,
      (state, action: PayloadAction<IResGetCurrentUser>) => {
        state.dataUser = action.payload.content.user;
        state.isLoading = false;
      }
    );

    builder.addCase(doGetCurrentUser.rejected, (state, action) => {
      const error = action.error;
      state.error = error;
      state.isLoading = false;
    });

    // getUserInfo
    builder.addCase(doGetUserInfo.pending, (state) => {
      state.error = null;
      state.isLoading = true;
    });

    builder.addCase(
      doGetUserInfo.fulfilled,
      (state, action: PayloadAction<IResGetCurrentUser>) => {
        state.userInfo = action.payload.content.user;
        state.isLoading = false;
      }
    );

    builder.addCase(doGetUserInfo.rejected, (state, action) => {
      const error = action.error;
      state.error = error;
      state.isLoading = false;
    });
  },
});

const { reducer: userReducer, actions } = slice;
export const { doFakeUpdateAvatar } = actions;
export default userReducer;

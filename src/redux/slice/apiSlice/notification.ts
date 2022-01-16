import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import {
  doMarkNotificationAsRead,
  doMarkAllNotificationAsRead,
  doGetAllNotifications,
} from "../../asyncActions";

const initialState = {
  listNotifications: [],
  isLoading: false,
  error: {},
} as ISliceNotification;

const slice = createSlice({
  name: "notification@",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(doGetAllNotifications.pending, (state) => {
      state.error = null;
      state.isLoading = true;
    });

    builder.addCase(
      doGetAllNotifications.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.listNotifications = action.payload.content;
        state.isLoading = false;
      }
    );

    builder.addCase(doGetAllNotifications.rejected, (state, action) => {
      const error = action.error;
      state.error = error;
      state.isLoading = false;
    });

    // mark one
    builder.addCase(doMarkNotificationAsRead.pending, (state) => {
      state.error = null;
      state.isLoading = true;
    });

    builder.addCase(
      doMarkNotificationAsRead.fulfilled,
      (state, action: PayloadAction<any>) => {
        const newItem = action.payload.content;

        if (newItem) {
          const index = state.listNotifications.findIndex(
            (item) => item.id === newItem.id
          );

          if (index >= 0) {
            state.listNotifications[index].isRead = 1;
          }
        }
        state.isLoading = false;
      }
    );

    builder.addCase(doMarkNotificationAsRead.rejected, (state, action) => {
      const error = action.error;
      state.error = error;
      state.isLoading = false;
    });

    // mark all
    builder.addCase(doMarkAllNotificationAsRead.pending, (state) => {
      state.error = null;
      state.isLoading = true;
    });

    builder.addCase(
      doMarkAllNotificationAsRead.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.listNotifications = action.payload.content;
        state.isLoading = false;
      }
    );

    builder.addCase(doMarkAllNotificationAsRead.rejected, (state, action) => {
      const error = action.error;
      state.error = error;
      state.isLoading = false;
    });
  },
});

const { reducer: notificationReducer, actions } = slice;
// export const { doFakeUpdateAvatar } = actions;
export default notificationReducer;

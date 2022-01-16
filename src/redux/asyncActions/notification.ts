import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiNotification } from "../../services/aixos";
import { objToFormData } from "../../helpers/api";

export const doMarkNotificationAsRead = createAsyncThunk(
  "notification@get/doMarkNotificationAsRead",
  async (params: IParamsMarkAsRead) => {
    const result = await apiNotification.markNotificationAsRead(params);
    return result.data;
  }
);

export const doMarkAllNotificationAsRead = createAsyncThunk(
  "notification@get/doMarkAllNotificationAsRead",
  async () => {
    const result = await apiNotification.markAllNotificationAsRead();
    return result.data;
  }
);

export const doGetAllNotifications = createAsyncThunk(
  "notification@get/doGetAllNotifications",
  async () => {
    const result = await apiNotification.getAllNotifications();
    return result.data;
  }
);

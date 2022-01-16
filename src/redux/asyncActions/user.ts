import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiAuth, apiUser } from "../../services/aixos";
import { objToFormData } from "../../helpers/api";

export const doGetCurrentUser = createAsyncThunk(
  "user@get/currentUser",
  async () => {
    const result = await apiUser.getCurrentUser();
    return result.data;
  }
);

export const doGetUserInfo = createAsyncThunk(
  "user@get/getUserInfo",
  async (params: any) => {
    const result = await apiUser.getUserInfo(params);
    return result.data;
  }
);

export const doUpdateInfo = createAsyncThunk(
  "user@post/doUpdateInfo",
  async (params: IParamsUpdateInfo) => {
    const result = await apiUser.updateInfo(params);
    return result.data;
  }
);

export const doUpdateAvatar = createAsyncThunk(
  "user@post/avatar",
  async (file: any) => {
    const formData = objToFormData(file);
    const result = await apiUser.updateAvatar(formData);
    return result.data;
  }
);

export const doFindUserByStudentId = createAsyncThunk(
  "user@post/doFindUserByStudentId",
  async (params: any) => {
    const result = await apiUser.updateInfo(params);
    return result.data;
  }
);

export const doChangePass = createAsyncThunk(
  "user@post/doChangePass",
  async (params: IParamsChangePassword) => {
    const result = await apiUser.changePass(params);
    return result.data;
  }
);

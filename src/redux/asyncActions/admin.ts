import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiAdmin } from "../../services/aixos";

export const doGetAllAdmin = createAsyncThunk(
  "admin@post/getAllAdmin",
  async () => {
    const result = await apiAdmin.getAllAdmin();
    return result.data;
  }
);

export const doAddAdmin = createAsyncThunk(
  "admin@post/addAdmin",
  async (params: IParamsAddAdmin) => {
    const result = await apiAdmin.addAdmin(params);
    return result.data;
  }
);

export const doGetAllUser = createAsyncThunk(
  "admin@post/getAllUser",
  async () => {
    const result = await apiAdmin.getAllUser();
    return result.data;
  }
);

export const doUpdateStudentId = createAsyncThunk(
  "admin@post/updateStudentId",
  async (params: IParamsUpdateStudentId) => {
    const result = await apiAdmin.updateStudentId(params);
    return result.data;
  }
);

export const doLockUser = createAsyncThunk(
  "admin@post/lockUser",
  async (params: IParamsLockUser) => {
    const result = await apiAdmin.lockUser(params);
    return result.data;
  }
);

export const doGetAllCourseSystem = createAsyncThunk(
  "admin@post/getAllCourse",
  async () => {
    const result = await apiAdmin.getAllCourse();
    return result.data;
  }
);

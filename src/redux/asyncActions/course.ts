import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { apiCourses } from "../../services/aixos";

export const doGetAllCourse = createAsyncThunk(
  "class@get/getAllCourse",
  async (params: any) => {
    const result = await apiCourses.getAllClass(params);
    return result.data;
  }
);

export const doAddCourse = createAsyncThunk(
  "class@post/addCourse",
  async (params: any) => {
    const result = await apiCourses.addClass(params);
    return result.data;
  }
);

export const doGetOneCourse = createAsyncThunk(
  "class@post/getOneCourse",
  async (params: IParamsGetOneCourse) => {
    const result = await apiCourses.getOneCourse(params);
    return result.data;
  }
);

export const doInviteViaEmail = createAsyncThunk(
  "class@post/postInviteViaEmail",
  async (params: IParamsInviteViaEmail) => {
    const result = await apiCourses.inviteViaEmail(params);
    return result.data;
  }
);

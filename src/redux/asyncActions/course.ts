import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiCourses } from "../../services/aixos";

export const doAddCourse = createAsyncThunk(
  "class@post/addCourse",
  async (params: IParamsAddCourse) => {
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

export const doUpdateCourseInfo = createAsyncThunk(
  "class@post/doUpdateCourseInfo",
  async (params: IParamsUpdateCourse) => {
    const result = await apiCourses.updateCourseInfo(params);
    return result.data;
  }
);

export const doDeleteCourse = createAsyncThunk(
  "class@post/doDeleteCourse",
  async (params: IParamsDeleteCouse) => {
    const result = await apiCourses.deleteCourse(params);
    return result.data;
  }
);

import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiCourses } from "../../services/aixos";

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
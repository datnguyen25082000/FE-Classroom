import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { apiCourses, apiCourseJoin } from "../../services/aixos";

export const doGetAllCourse = createAsyncThunk(
  "class@get/getAllCourse",
  async (params: any) => {
    const result = await apiCourseJoin.getAllCourses(params);
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

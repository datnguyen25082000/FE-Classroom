import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiAuth, apiCourseStudent } from "../../services/aixos";
import { objToFormData } from "../../helpers/api";

export const doGetAllStudentOfCourse = createAsyncThunk(
  "courseStudent@get/doGetAllStudentOfCourse",
  async (params: IParamsGetAllStudentByCourse) => {
    const result = await apiCourseStudent.getAllStudentOfCourse(params);
    return result.data;
  }
);

export const doAddStudentsToCourse = createAsyncThunk(
  "courseStudent@post/doAddStudentsToCourse",
  async (params: IParamsAddStudentsToCourse) => {
    const result = await apiCourseStudent.addStudentsToCourse(params);
    return result.data;
  }
);

import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiAuth, apiScore } from "../../services/aixos";
import { objToFormData } from "../../helpers/api";

export const doAddScoreAssignmentCate = createAsyncThunk(
  "score@post/doAddScoreAssignmentCate",
  async (params: IParamsAddScoreAssignmentCate) => {
    const result = await apiScore.addScoreAssignmentCate(params);
    return result.data;
  }
);

export const doGetAllScoreOfCourse = createAsyncThunk(
  "score@get/doGetAllScoreOfCourse",
  async (params: IParamsGetAllStudentByCourse) => {
    const result = await apiScore.getAllScoreOfCourse(params);
    return result.data;
  }
);

export const doGetSStudentScore = createAsyncThunk(
  "score@get/doGetSStudentScore",
  async (params: IParamsGetAllStudentByCourse) => {
    const result = await apiScore.getStudentScore(params);
    return result.data;
  }
);

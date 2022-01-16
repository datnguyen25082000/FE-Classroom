import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiScoreReview } from "../../services/aixos";
import { objToFormData } from "../../helpers/api";

export const doCreateScoreReview = createAsyncThunk(
  "score-review@post/doCreateScoreReview",
  async (params: IParamsCreateScoreReview) => {
    const result = await apiScoreReview.createScoreReview(params);
    return result.data;
  }
);

export const doGetScoreReviewByCourse = createAsyncThunk(
  "score-review@get/doGetScoreReviewByCourse",
  async (params: IParamsGetAllReviewByCourse) => {
    const result = await apiScoreReview.getScoreReviewByCourse(params);
    return result.data;
  }
);

export const doFinalizeReviewScore = createAsyncThunk(
  "score-review@post/doFinalizeReviewScore",
  async (params: IParamsFinalizeReviewScore) => {
    const result = await apiScoreReview.finalizeReviewScore(params);
    return result.data;
  }
);

export const doGetAllReviewByUser = createAsyncThunk(
  "score-review@get/doGetAllReviewByUser",
  async () => {
    const result = await apiScoreReview.getAllReviewByUser();
    return result.data;
  }
);

export const doGetReviewByAssignment = createAsyncThunk(
  "score-review@post/getReviewByAssignment",
  async (params: IParamsGetReviewByAssignment) => {
    const result = await apiScoreReview.getReviewByAssignment(params);
    return result.data;
  }
);

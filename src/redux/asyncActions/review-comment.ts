import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiReviewComment } from "../../services/aixos";
import { objToFormData } from "../../helpers/api";

export const doAddCommentReview = createAsyncThunk(
  "review-comment@post/doAddCommentReview",
  async (params: IParamsAddCommentReview) => {
    const result = await apiReviewComment.addCommentReview(params);
    return result.data;
  }
);

export const doGetAllByCommentByScoreReview = createAsyncThunk(
  "review-comment@post/doGetAllByCommentByScoreReview",
  async (params: IParamsGetAllCommentByScoreReview) => {
    const result = await apiReviewComment.getAllByCommentByScoreReview(params);
    return result.data;
  }
);

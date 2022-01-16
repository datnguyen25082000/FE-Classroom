import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import {
  doAddCommentReview,
  doGetAllByCommentByScoreReview,
} from "../../asyncActions";

const initialState = {
  isLoading: false,
  error: {},
  listComment: [],
} as ISliceReviewComment;

const slice = createSlice({
  name: "review-comment@",
  initialState: initialState,
  reducers: {
    doFakeDisplayName(state, action) {
      if (state.listComment) {
        state.listComment[state.listComment.length - 1].displayName =
          action.payload;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(doGetAllByCommentByScoreReview.pending, (state) => {
      state.error = null;
      state.listComment = [];
      state.isLoading = true;
    });

    builder.addCase(
      doGetAllByCommentByScoreReview.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.listComment = action.payload.content;
        state.isLoading = false;
      }
    );

    builder.addCase(
      doGetAllByCommentByScoreReview.rejected,
      (state, action) => {
        const error = action.error;
        state.error = error;
        state.isLoading = false;
      }
    );

    // add comment
    builder.addCase(doAddCommentReview.pending, (state) => {
      state.error = null;
      state.isLoading = true;
    });

    builder.addCase(
      doAddCommentReview.fulfilled,
      (state, action: PayloadAction<any>) => {
        const newComment = action.payload.content;
        if (newComment) {
          if (!state.listComment || !state.listComment.length) {
            state.listComment = [newComment];
          } else state.listComment = [...state.listComment, newComment];
        }
        state.isLoading = false;
      }
    );

    builder.addCase(doAddCommentReview.rejected, (state, action) => {
      const error = action.error;
      state.error = error;
      state.isLoading = false;
    });
  },
});

const { reducer: reviewCommentReducer, actions } = slice;
export const { doFakeDisplayName } = actions;
export default reviewCommentReducer;

import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import {
  doCreateScoreReview,
  doGetScoreReviewByCourse,
  doFinalizeReviewScore,
  doGetAllReviewByUser,
  doGetReviewByAssignment,
} from "../../asyncActions";

const initialState = {
  isLoading: false,
  error: {},
  listReviewByAssign: {},
  listReviewOfCourse: [],
} as ISliceScoreReview;

const slice = createSlice({
  name: "score-review@",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(doGetScoreReviewByCourse.pending, (state) => {
      state.error = null;
      state.isLoading = true;
      state.listReviewOfCourse = [];
    });

    builder.addCase(
      doGetScoreReviewByCourse.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.listReviewOfCourse = action.payload.content;
      }
    );

    builder.addCase(doGetScoreReviewByCourse.rejected, (state, action) => {
      const error = action.error;
      state.error = error;
      state.isLoading = false;
    });

    // get all by assignment
    builder.addCase(doGetReviewByAssignment.pending, (state) => {
      state.error = null;
      state.isLoading = true;
      state.listReviewByAssign = {};
    });

    builder.addCase(
      doGetReviewByAssignment.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.listReviewByAssign = action.payload.content;
      }
    );

    builder.addCase(doGetReviewByAssignment.rejected, (state, action) => {
      const error = action.error;
      state.error = error;
      state.isLoading = false;
    });

    // do add score review
    builder.addCase(doCreateScoreReview.pending, (state) => {
      state.error = null;
      state.isLoading = true;
    });

    builder.addCase(
      doCreateScoreReview.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.listReviewByAssign = action.payload.content;
      }
    );

    builder.addCase(doCreateScoreReview.rejected, (state, action) => {
      const error = action.error;
      state.error = error;
      state.isLoading = false;
    });

    // finalize
    builder.addCase(doFinalizeReviewScore.pending, (state) => {
      state.error = null;
      state.isLoading = true;
    });

    builder.addCase(
      doFinalizeReviewScore.fulfilled,
      (state, action: PayloadAction<any>) => {
        const newItem = action.payload.content;

        if (newItem) {
          const index = state.listReviewOfCourse.findIndex(
            (item) => item.id === newItem.id
          );

          if (index >= 0) {
            state.listReviewOfCourse[index].isFinalized = 1;
          }
        }

        state.isLoading = false;
      }
    );

    builder.addCase(doFinalizeReviewScore.rejected, (state, action) => {
      const error = action.error;
      state.error = error;
      state.isLoading = false;
    });
  },
});

const { reducer: scoreReviewReducer, actions } = slice;
// export const { doFakeUpdateAvatar } = actions;
export default scoreReviewReducer;

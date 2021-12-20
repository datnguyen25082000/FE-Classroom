import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import {
  doGetAllScoreOfCourse,
  doAddScoreAssignmentCate,
} from "../../asyncActions";

const initialState = {
  listScore: {},
  userInfo: {},
  isLoading: false,
  error: {},
} as ISliceScore;

const slice = createSlice({
  name: "score@",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(doGetAllScoreOfCourse.pending, (state) => {
      state.listScore = [];
      state.isLoading = true;
    });

    builder.addCase(
      doGetAllScoreOfCourse.fulfilled,
      (state, action: PayloadAction<IResGetAllScore>) => {
        state.isLoading = false;
        state.listScore = action.payload.content;
      }
    );

    //
    builder.addCase(
      doAddScoreAssignmentCate.fulfilled,
      (state, action: PayloadAction<IResAddScoreCate>) => {
        state.isLoading = false;
        const newScore = action.payload.content;

        if (newScore && newScore.length) {
          newScore.forEach((score) => {
            const col_id = score.assignment_category_id;

            if (state.listScore) {
              state.listScore.forEach((element, i) => {
                const index = element.scoresOfStudent.findIndex(
                  (item) => item.assignment_category_id === col_id
                );

                if (
                  index >= 0 &&
                  element.id === score.course_student_id
                ) {
                  state.listScore[i].scoresOfStudent[index].point = score.point;
                }
              });
            }
          });
        }
      }
    );
  },
});

const { reducer: scoreReducer, actions } = slice;
export default scoreReducer;

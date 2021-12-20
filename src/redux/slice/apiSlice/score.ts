import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import {
  doGetAllScoreOfCourse,
  doAddScoreAssignmentCate,
  doGetSStudentScore,
} from "../../asyncActions";

const initialState = {
  listScore: {},
  userInfo: {},
  isLoading: false,
  error: {},
  studentScore: {},
} as ISliceScore;

const slice = createSlice({
  name: "score@",
  initialState: initialState,
  reducers: {
    doFakeAddStudentList(state, action) {
      const newData = action.payload;

      if (newData) {
        state.listScore = newData;
      }
    },
  },
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
                let index = -1;
                if (element.scoresOfStudent && element.scoresOfStudent.length) {
                  index = element.scoresOfStudent.findIndex(
                    (item) => item.assignment_category_id === col_id
                  );
                }

                if (index >= 0 && element.id === score.course_student_id) {
                  state.listScore[i].scoresOfStudent[index].point = score.point;
                } else {
                  if (element.id === score.course_student_id) {
                    let arr = state.listScore[i]?.scoresOfStudent || [];
                    arr.push(score);
                    state.listScore[i].scoresOfStudent = arr;
                  }
                }
              });
            }
          });
        }
      }
    );

    //
    builder.addCase(doGetSStudentScore.pending, (state) => {
      state.studentScore = undefined;
      state.isLoading = true;
    });

    builder.addCase(
      doGetSStudentScore.fulfilled,
      (state, action: PayloadAction<IResGetStudentScore>) => {
        state.isLoading = false;
        state.studentScore = action.payload.content;
      }
    );
  },
});

const { reducer: scoreReducer, actions } = slice;
export const { doFakeAddStudentList } = actions;

export default scoreReducer;

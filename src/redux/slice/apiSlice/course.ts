import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import {
  doGetAllCourse,
  doAddCourse,
  doGetOneCourse,
} from "../../asyncActions";
import { courseApi } from "../../apis";

const initialState = {
  listClass: [],
  oneCourse: {},
  isLoading: false,
  error: {},
} as ISliceClass;

const slice = createSlice({
  name: "course@",
  initialState: initialState,
  reducers: {
    doFakeAddCourse(state, action: PayloadAction<IResCourse>) {
      const newClass = action.payload;
      state.listClass = [newClass, ...state.listClass];
    },

    doFakeLeaveCourse(state, action) {
      const course_id = action.payload;
      state.listClass = state.listClass.filter(
        (item) => item.course_id !== course_id
      );
    },
  },
  extraReducers: (builder) => {
    builder.addCase(doGetAllCourse.pending, (state) => {
      state.error = null;
      state.isLoading = true;
    });

    builder.addCase(
      doGetAllCourse.fulfilled,
      (state, action: PayloadAction<IResGetAllCourse>) => {
        state.listClass = action.payload.content.courses;
        state.isLoading = false;
      }
    );

    builder.addCase(doGetAllCourse.rejected, (state, action) => {
      const error = action.error;
      state.error = error;
      state.isLoading = false;
    });

    // add class
    builder.addCase(doAddCourse.pending, (state) => {
      state.error = null;
      state.isLoading = true;
    });

    builder.addCase(
      doAddCourse.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.isLoading = false;
      }
    );

    builder.addCase(doAddCourse.rejected, (state, action) => {
      const error = action.error;
      state.error = error;
      state.isLoading = false;
    });

    // add class
    builder.addCase(doGetOneCourse.pending, (state) => {
      state.error = null;
      state.isLoading = true;
      state.oneCourse = {};
    });

    builder.addCase(
      doGetOneCourse.fulfilled,
      (state, action: PayloadAction<IResGetOneCourse>) => {
        state.isLoading = false;
        if (action.payload) state.oneCourse = action.payload.content.course;
      }
    );

    builder.addCase(doGetOneCourse.rejected, (state, action) => {
      const error = action.error;
      state.error = error;
      state.isLoading = false;
    });

    // api get one
    builder.addMatcher(
      courseApi.endpoints.fetchOneCourse.matchFulfilled,
      (state, { payload }) => {
        state.oneCourse = payload;
      }
    );
  },
});
const { reducer: courseReducer, actions } = slice;
export const { doFakeAddCourse, doFakeLeaveCourse } = actions;
export default courseReducer;

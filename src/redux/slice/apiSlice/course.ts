import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import { doGetAllCourse, doAddCourse } from '../../asyncActions';

const initialState = {
  listClass: [],
  isLoading: false,
  error: {},
} as ISliceClass;

const slice = createSlice({
  name: 'course@',
  initialState: initialState,
  reducers: {
    doFakeAddCourse(state, action: PayloadAction<IResCourse>) {
      const newClass = action.payload;
      state.listClass = [newClass, ...state.listClass];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(doGetAllCourse.pending, (state) => {
      state.error = null;
      state.isLoading = true;
    });

    builder.addCase(doGetAllCourse.fulfilled, (state, action: PayloadAction<IResGetAllCourse>) => {
      state.listClass = action.payload.content.courses;
      state.isLoading = false;
    });

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

    builder.addCase(doAddCourse.fulfilled, (state, action: PayloadAction<any>) => {
      state.isLoading = false;
    });

    builder.addCase(doAddCourse.rejected, (state, action) => {
      const error = action.error;
      state.error = error;
      state.isLoading = false;
    });
  },
});
const { reducer: courseReducer, actions } = slice;
export const { doFakeAddCourse } = actions;
export default courseReducer;

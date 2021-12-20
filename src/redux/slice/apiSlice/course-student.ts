import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { doGetCurrentUser, doGetUserInfo } from "../../asyncActions";

const initialState = {
  dataUser: {},
  userInfo: {},
  isLoading: false,
  error: {},
} as ISliceUser;

const slice = createSlice({
  name: "courseStudent@",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {},
});

const { reducer: courseStudentReducer, actions } = slice;
export default courseStudentReducer;

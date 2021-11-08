import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import { doLogin } from '../../asyncActions';

const initialState = {
  listClass: [],
  isLoading: false,
  error: {},
} as ISliceClass;

const slice = createSlice({
  name: 'auth@',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(doLogin.pending, (state) => {
      state.error = null;
      state.isLoading = true;
    });

    builder.addCase(doLogin.fulfilled, (state, action: PayloadAction<any>) => {
      state.listClass = action.payload.result;
      state.isLoading = false;
    });

    builder.addCase(doLogin.rejected, (state, action) => {
      const error = action.error;
      state.error = error;
      state.isLoading = false;
    });
  },
});

const { reducer: authReducer } = slice;
export default authReducer;

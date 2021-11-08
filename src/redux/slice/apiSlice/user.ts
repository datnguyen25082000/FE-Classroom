import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import { doGetCurrentUser } from '../../asyncActions';

const initialState = {
  dataUser: {},
  isLoading: false,
  error: {},
} as ISliceUser;

const slice = createSlice({
  name: 'user@',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(doGetCurrentUser.pending, (state) => {
      state.error = null;
      state.isLoading = true;
    });

    builder.addCase(
      doGetCurrentUser.fulfilled,
      (state, action: PayloadAction<IResGetCurrentUser>) => {
        state.dataUser = action.payload.content.user;
        state.isLoading = false;
      },
    );

    builder.addCase(doGetCurrentUser.rejected, (state, action) => {
      const error = action.error;
      state.error = error;
      state.isLoading = false;
    });
  },
});

const { reducer: userReducer } = slice;
export default userReducer;

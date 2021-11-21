import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiAuth } from '../../services/aixos';

export const doGetCurrentUser = createAsyncThunk('user@get/currentUser', async () => {
  const result = await apiAuth.getCurrentUser();
  return result.data;
});

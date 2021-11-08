import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { apiUser } from '../../services/aixos';

export const doGetCurrentUser = createAsyncThunk('user@get/currentUser', async () => {
  const result = await apiUser.getCurrentUser();
  return result.data;
});

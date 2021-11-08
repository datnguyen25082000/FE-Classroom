import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { apiAuth } from '../../services/aixos';

export const doLogin = createAsyncThunk('auth@post/login', async (params: any) => {
  const result = await apiAuth.login(params);
  return result.data;
});

export const doRegister = createAsyncThunk('auth@post/register', async (params: any) => {
  const result = await apiAuth.register(params);
  return result.data;
});

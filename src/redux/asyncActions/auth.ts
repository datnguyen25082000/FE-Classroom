import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { apiAuth } from "../../services/aixos";

export const doLogin = createAsyncThunk(
  "auth@post/login",
  async (params: any) => {
    const result = await apiAuth.login(params);
    return result.data;
  }
);

export const doLoginAdmin = createAsyncThunk(
  "auth@post/doLoginAdmin",
  async (params: any) => {
    const result = await apiAuth.loginAdmin(params);
    return result.data;
  }
);

export const doRegister = createAsyncThunk(
  "auth@post/register",
  async (params: any) => {
    const result = await apiAuth.register(params);
    return result.data;
  }
);

export const doForgotPass = createAsyncThunk(
  "auth@post/doForgotPass",
  async (params: IParamsForgotPassword) => {
    const result = await apiAuth.forgetPass(params);
    return result.data;
  }
);

export const doResetPass = createAsyncThunk(
  "auth@post/doResetPass",
  async (params: IParamsResetPassword) => {
    const result = await apiAuth.resetPass(params);
    return result.data;
  }
);

export const doActiveUser = createAsyncThunk(
  "auth@post/doActiveUser",
  async (params: IParamsActivateUser) => {
    const result = await apiAuth.activateUser(params);
    return result.data;
  }
);

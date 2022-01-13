import { defaultParmasAPI, objToQuery } from "./../../helpers/api";
import axiosClient from "./axiosClient";

const baseUrl = "Auth/";
export const apiAuth = {
  login: (params: any) => {
    const url = baseUrl + "Login";
    return axiosClient.post(url, params);
  },

  register: (params: any) => {
    const url = baseUrl + "Register";
    return axiosClient.post(url, params);
  },

  forgetPass: (params: IParamsForgotPassword) => {
    const url = baseUrl + "forgot-password";
    return axiosClient.post(url, params);
  },

  resetPass: (params: IParamsResetPassword) => {
    const url = baseUrl + "reset-password";
    return axiosClient.post(url, params);
  },

  activateUser: (params: IParamsActivateUser) => {
    const url = baseUrl + 'activate-user';
    return axiosClient.post(url, params)
  }
};

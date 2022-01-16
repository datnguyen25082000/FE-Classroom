import { defaultParmasAPI, objToQuery } from "./../../helpers/api";
import axiosClient from "./axiosClient";

const baseUrl = "User/";

export const apiUser = {
  getCurrentUser: () => {
    const url = baseUrl + "GetCurrentUser";
    return axiosClient.get(url);
  },

  getUserInfo: (params: any) => {
    const url = baseUrl + "GetUserInfo";
    return axiosClient.post(url, params);
  },

  updateInfo: (params: IParamsUpdateInfo) => {
    const url = baseUrl + "UpdateInfo";
    return axiosClient.post(url, params);
  },

  updateAvatar: (params: any) => {
    const url = baseUrl + `UpdateAvatar`;
    return axiosClient.post(url, params);
  },

  findUserByStudentId: (params: any) => {
    const url = baseUrl + `find-user-by-student-id`;
    return axiosClient.get(url + objToQuery({ ...params }));
  },

  changePass: (params: IParamsChangePassword) => {
    const url = baseUrl + "change-password";
    return axiosClient.post(url, params);
  },
};

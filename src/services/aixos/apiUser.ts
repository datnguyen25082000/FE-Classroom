import { defaultParmasAPI, objToQuery } from "./../../helpers/api";
import axiosClient from "./axiosClient";

const baseUrl = "User/";

export const apiUser = {
  getCurrentUser: () => {
    const url = baseUrl + "GetCurrentUser";
    return axiosClient.get(url);
  },

  getUserInfo: () => {
    const url = baseUrl + "GetUserInfo";
    return axiosClient.get(url);
  },

  updateInfo: (params: IParamsUpdateInfo) => {
    const url = baseUrl + "UpdateInfo";
    return axiosClient.post(url, params);
  },

  updateAvatar: (params: any) => {
    const url = baseUrl + `UpdateAvatar`;
    return axiosClient.post(url, params);
  },
};

import { objToQuery } from "./../../helpers/api";
import axiosClient from "./axiosClient";

const baseUrl = "admin/";

export const apiAdmin = {
  getAllAdmin: () => {
    const url = baseUrl + "get-all";
    return axiosClient.get(url);
  },

  addAdmin: (params: IParamsAddAdmin) => {
    const url = baseUrl + "add";
    return axiosClient.post(url, params);
  },

  getAllUser: () => {
    const url = baseUrl + "all-user";
    return axiosClient.get(url);
  },

  updateStudentId: (params: IParamsUpdateStudentId) => {
    const url = baseUrl + "update-student-id";
    return axiosClient.post(url, params);
  },

  lockUser: (params: IParamsLockUser) => {
    const url = baseUrl + "lock-user";
    return axiosClient.post(url, params);
  },

  getAllCourse: () => {
    const url = baseUrl + "all-courses";
    return axiosClient.get(url);
  },
};

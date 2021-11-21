import { defaultParmasAPI, objToQuery } from "./../../helpers/api";
import axiosClient from "./axiosClient";

const baseUrl = "Courses/";
export const apiCourses = {
  getAllClass: (params: any) => {
    const url = baseUrl + "GetAllCourse";
    const defaultParams = defaultParmasAPI(params.currentpage, params.limit);
    return axiosClient.get(url + objToQuery({ ...params, ...defaultParams }));
  },

  addClass: (params: any) => {
    const url = baseUrl + "AddCourse";
    const defaultParams = defaultParmasAPI(params.currentpage, params.limit);
    return axiosClient.post(url + objToQuery({ ...params, ...defaultParams }));
  },

  getOneCourse: (params: IParamsGetOneCourse) => {
    const url = baseUrl + "GetOneCourse";
    return axiosClient.get(url + objToQuery({ ...params }));
  },

  inviteViaEmail: (params: IParamsInviteViaEmail) => {
    const url = baseUrl + "InviteViaEmail";
    return axiosClient.post(url, params);
  },
};

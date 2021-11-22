import { defaultParmasAPI, objToQuery } from "./../../helpers/api";
import axiosClient from "./axiosClient";

const baseUrl = "Courses/";
export const apiCourses = {
  getAllClass: (params: any) => {
    const url = baseUrl + "GetAllCourse";
    const defaultParams = defaultParmasAPI(params.currentpage, params.limit);
    return axiosClient.get(url + objToQuery({ ...params, ...defaultParams }));
  },

  addClass: (params: IParamsAddCourse) => {
    const url = baseUrl + "AddCourse";
    return axiosClient.post(url + objToQuery({ ...params }));
  },

  getOneCourse: (params: IParamsGetOneCourse) => {
    const url = baseUrl + "GetOneCourse";
    return axiosClient.get(url + objToQuery({ ...params }));
  },

  updateCourseInfo: (params: IParamsUpdateCourse) => {
    const url = baseUrl + "UpdateCourseInfo";
    return axiosClient.post(url, params);
  },

  deleteCourse: (params: IParamsDeleteCouse) => {
    const url = baseUrl + "DeleteCourse";
    return axiosClient.post(url + objToQuery({ ...params }));
  },
};

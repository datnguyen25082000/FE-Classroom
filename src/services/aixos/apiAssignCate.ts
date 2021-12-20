import { objToQuery } from "./../../helpers/api";
import axiosClient from "./axiosClient";

const baseUrl = "assignment-category/";

export const apiAssignCate = {
  getAllAssignByCourse: (params: IParamsGetAllAssignByCourse) => {
    const url = baseUrl + "get-all-by-course";
    return axiosClient.get(url + objToQuery({ ...params }));
  },

  addAssignmentCategory: (params: IParamsAddAssignmentCategory) => {
    const url = baseUrl + "add";
    return axiosClient.post(url, params);
  },

  updateAssignmentCategory: (params: IParamsUpdateAssignmentCategory) => {
    const url = baseUrl + "update";
    return axiosClient.post(url, params);
  },

  deleteAssignmentCategory: (params: IParamsDeleteAssignmentCategory) => {
    const url = baseUrl + "delete";
    return axiosClient.post(url, params);
  },

  updatePositionAssignCate: (params: IParamsUpdatePositionAssignCate) => {
    const url = baseUrl + "update-position";
    return axiosClient.post(url, params);
  },
  finalizeAssignment: (params: IParamsDeleteAssignmentCategory) => {
    const url = baseUrl + "finalize";
    return axiosClient.post(url, params);
  },
};

import { objToQuery } from "./../../helpers/api";
import axiosClient from "./axiosClient";

const baseUrl = "score/";

export const apiScore = {
  addScoreAssignmentCate: (params: IParamsAddScoreAssignmentCate) => {
    const url = baseUrl + "add-many-by-assignment-category";
    return axiosClient.post(url, params);
  },

  getAllScoreOfCourse: (params: IParamsGetAllStudentByCourse) => {
    const url = baseUrl + "get-all-by-course";
    return axiosClient.get(url + objToQuery({ ...params }));
  },

  getStudentScore: (params: IParamsGetAllStudentByCourse) => {
    const url = baseUrl + "get-all-by-course-and-current-user";
    return axiosClient.get(url + objToQuery({ ...params }));
  },
};

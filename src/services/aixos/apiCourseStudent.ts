import { objToQuery } from "./../../helpers/api";
import axiosClient from "./axiosClient";

const baseUrl = "course-students/";

export const apiCourseStudent = {
  getAllStudentOfCourse: (params: IParamsGetAllStudentByCourse) => {
    const url = baseUrl + "get-all-by-course";
    return axiosClient.get(url + objToQuery({ ...params }));
  },

  addStudentsToCourse: (params: IParamsAddStudentsToCourse) => {
    const url = baseUrl + "add-many-by-course";
    return axiosClient.post(url, params);
  },
};

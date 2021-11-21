import { defaultParmasAPI, objToQuery } from "./../../helpers/api";
import axiosClient from "./axiosClient";

const baseUrl = "course-join/";
export const apiCourseJoin = {
  getAllCourses: (params: any) => {
    const url = baseUrl + "GetAllCourses";
    const defaultParams = defaultParmasAPI(params.currentpage, params.limit);
    return axiosClient.get(url + objToQuery({ ...params, ...defaultParams }));
  },

  getAllMembersOfCourse: (params: any) => {
    const url = baseUrl + "AllMembers";
    const defaultParams = defaultParmasAPI(params.currentpage, params.limit);
    return axiosClient.get(url + objToQuery({ ...params, ...defaultParams }));
  },

  joinCourse: (params: any) => {
    const url = baseUrl + "joinCourse";
    const defaultParams = defaultParmasAPI(params.currentpage, params.limit);
    return axiosClient.get(url + objToQuery({ ...params, ...defaultParams }));
  },

  inviteViaEmail: (params: IParamsInviteViaEmail) => {
    const url = baseUrl + "InviteViaEmail";
    return axiosClient.post(url, params);
  },
};

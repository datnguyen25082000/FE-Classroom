import { defaultParmasAPI, objToQuery } from "./../../helpers/api";
import axiosClient from "./axiosClient";

const baseUrl = "course-join/";
export const apiCourseJoin = {
    getAllCourses: (params: any) => {
        const url = baseUrl + "GetAllCourses";
        const defaultParams = defaultParmasAPI(params.currentpage, params.limit);
        return axiosClient.get(url + objToQuery({ ...params, ...defaultParams }));
    }
};

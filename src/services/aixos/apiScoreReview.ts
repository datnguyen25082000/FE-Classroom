import { objToQuery } from "./../../helpers/api";
import axiosClient from "./axiosClient";

const baseUrl = "score-review/";

export const apiScoreReview = {
  createScoreReview: (params: IParamsCreateScoreReview) => {
    const url = baseUrl + "create";
    return axiosClient.post(url, params);
  },

  getScoreReviewByCourse: (params: IParamsGetAllReviewByCourse) => {
    const url = baseUrl + "get-all-by-course";
    return axiosClient.get(url + objToQuery({ ...params }));
  },

  finalizeReviewScore: (params: IParamsFinalizeReviewScore) => {
    const url = baseUrl + "finalize";
    return axiosClient.post(url, params);
  },

  getAllReviewByUser: () => {
    const url = baseUrl + "get-all-by-user";
    return axiosClient.get(url);
  },

  getReviewByAssignment: (params: IParamsGetReviewByAssignment) => {
    const url = baseUrl + "get-by-assignment";
    return axiosClient.get(url + objToQuery({ ...params }));
  },
};

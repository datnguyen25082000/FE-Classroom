import { objToQuery } from "./../../helpers/api";
import axiosClient from "./axiosClient";

const baseUrl = "score-review-comment/";

export const apiReviewComment = {
  addCommentReview: (params: IParamsAddCommentReview) => {
    const url = baseUrl + "add";
    return axiosClient.post(url, params);
  },

  getAllByCommentByScoreReview: (params: IParamsGetAllCommentByScoreReview) => {
    const url = baseUrl + "get-all-by-score-review";
    return axiosClient.get(url + objToQuery({ ...params }));
  },
};

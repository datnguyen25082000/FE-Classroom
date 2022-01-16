import { objToQuery } from "./../../helpers/api";
import axiosClient from "./axiosClient";

const baseUrl = "notification/";

export const apiNotification = {
  markNotificationAsRead: (params: IParamsMarkAsRead) => {
    const url = baseUrl + "mark-as-read";
    return axiosClient.get(url + objToQuery({ ...params }));
  },

  markAllNotificationAsRead: () => {
    const url = baseUrl + "mark-all-as-read";
    return axiosClient.get(url);
  },

  getAllNotifications: () => {
    const url = baseUrl + "get-all";
    return axiosClient.get(url);
  },
};

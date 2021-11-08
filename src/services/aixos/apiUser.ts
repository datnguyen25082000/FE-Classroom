import { defaultParmasAPI, objToQuery } from './../../helpers/api';
import axiosClient from './axiosClient';

const baseUrl = 'Users/';
export const apiUser = {
  getCurrentUser: () => {
    const url = baseUrl + 'GetCurrentUser';
    return axiosClient.get(url);
  },
};

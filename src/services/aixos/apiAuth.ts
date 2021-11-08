import { defaultParmasAPI, objToQuery } from './../../helpers/api';
import axiosClient from './axiosClient';

const baseUrl = 'Auth/';
export const apiAuth = {
  login: (params: any) => {
    const url = baseUrl + 'Login';
    return axiosClient.post(url, params);
  },

  register: (params: any) => {
    const url = baseUrl + 'Register';
    return axiosClient.post(url, params);
  },
};

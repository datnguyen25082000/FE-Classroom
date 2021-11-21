import axios, { AxiosError, AxiosResponse } from "axios";
import { EToken } from "../../constants";
const baseURL = process.env.REACT_APP_URL_API;
const token = localStorage.getItem(EToken.loginToken);
const accessToken = localStorage.getItem(EToken.loginToken)

const axiosMy = axios.create({
  baseURL: baseURL + "api/",
  headers: {
    "content-type": "application/json",
    Authorization: `bearer ${token}`,
    'access_token': accessToken
  },
});
axiosMy.interceptors.response.use(
  (res: AxiosResponse<{ content: any; message: string; result: number }>) => {
    return res;
  },
  (err: AxiosError) => {
    throw err;
  }
);
export default axiosMy;

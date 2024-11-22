import axios, {AxiosRequestConfig} from 'axios';
import { getToken, removeToken } from '../store/authStore';

const BASE_URL = "http://localhost:3002";
const DEFAULT_TIMEOUT = 300000;

export const createClient = (config?: AxiosRequestConfig) => {

  const axiosInstance = axios.create({
    baseURL : BASE_URL,
    timeout : DEFAULT_TIMEOUT,
    headers : {
      "content-type" : "application/json",
      Authorization : getToken() ? getToken() : "",
    },
    withCredentials : true,
    ...config,
  });

  axiosInstance.interceptors.response.use((response) => {
    return response;
  },(error) => {
    console.log(error);
    if(error.response && error.response.status === 401){
      removeToken();
      window.location.href = "/login";
      return;
    }
    return Promise.reject(error);
  });

  return axiosInstance;
}

export interface ResponseJson {
  message : string,
  code : number,
  data : object
}

export interface ResponseJsonNumber {
  message : string,
  code : number,
  data : number
}

export interface ResponseJsonString {
  message : string,
  code : number,
  data : string
}
export const httpClient = createClient();
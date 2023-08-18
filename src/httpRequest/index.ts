import axios, { AxiosError, AxiosResponse, HttpStatusCode } from 'axios';
import useUserStore from '@/stores/user';
import Router from 'next/router';
import { PagePath } from '@/enums';

const API_ROOT = process.env.NEXT_PUBLIC_API;

const httpRequest = axios.create({
  withCredentials: true,
  baseURL: API_ROOT,
  headers: {
    Authorization: useUserStore.getState().user?.accessToken,
  },
});

httpRequest.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: AxiosError<{ message: string }>) => {
    if (error.response?.status === HttpStatusCode.Unauthorized) {
      useUserStore.getState().logout();
      localStorage.removeItem('user');
      Router.push(PagePath.Login);
    }
    return Promise.reject(error);
  }
);

export default httpRequest;

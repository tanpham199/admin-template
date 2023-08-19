import axios, { AxiosError, HttpStatusCode } from 'axios';
import useUserStore from '@/stores/user';
import Router from 'next/router';
import { PagePath } from '@/enums';

const API_ROOT = process.env.NEXT_PUBLIC_API;

const httpRequest = axios.create({
  baseURL: API_ROOT,
});

httpRequest.interceptors.request.use((config) => {
  const { accessToken } = useUserStore.getState();
  config.headers.Authorization = accessToken;
  return config;
});

httpRequest.interceptors.response.use(
  (response) => {
    return response.data;
  },
  async (error: AxiosError) => {
    if (error.response?.status === HttpStatusCode.Unauthorized) {
      const { accessToken, logout } = useUserStore.getState();
      const originalRequest = error.config as typeof error.config & { _retry: boolean };
      const shouldRetry = accessToken && originalRequest && !originalRequest._retry;
      if (shouldRetry) {
        originalRequest._retry = true;
        await useUserStore.getState().refreshToken();
        return httpRequest(originalRequest);
      } else {
        logout();
        localStorage.removeItem('user');
        Router.push(PagePath.Login);
      }
    }
    return Promise.reject(error);
  }
);

export default httpRequest;

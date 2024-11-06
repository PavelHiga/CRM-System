import { useAuthStore } from '@/store/auth';
import axios, { type InternalAxiosRequestConfig } from 'axios';
import { accessToken } from './auth';

export const axiosInstance = axios.create({
  baseURL: 'https://easydev.club/api/v1',
});

axiosInstance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  config.headers.Authorization = `Bearer ${accessToken}`;
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    const { checkAuth } = useAuthStore();

    if (error.response.status == 401 && !error.config._isRetry) {
      originalRequest._isRetry = true;
      try {
        await checkAuth();

        return axiosInstance.request(originalRequest);
      } catch (error) {
        console.log(error);
      }
    }
    throw error;
  }
);

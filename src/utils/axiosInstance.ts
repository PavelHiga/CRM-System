import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: 'https://easydev.club/api/v1',
  timeout: 1000,
});

import type { AuthData, Profile, UserRegistration, Token, ProfileRequest } from '@/types/auth';
import { axiosInstance } from './axios';
import { allResposeStatus } from '@/utils/responseStatus';
import axios from 'axios';

export let accessToken: string = '';

export const changeAccessToken = (value: string) => {
  accessToken = value;
};

export const signUpAccount = async (registrationData: UserRegistration): Promise<Profile> => {
  try {
    const response = await axiosInstance.post<Profile>(`/auth/signup`, registrationData);
    return response.data;
  } catch (error: any) {
    console.log(error);
    const status = error?.request?.status;
    throw new Error(allResposeStatus[status]);
  }
};

export const signInAccount = async (authData: AuthData): Promise<Token> => {
  try {
    const response = await axiosInstance.post<Token>(`/auth/signin`, authData);
    return response.data;
  } catch (error: any) {
    console.log(error);
    const status = error?.request?.status;
    throw new Error(allResposeStatus[status]);
  }
};

export const refreshAccessToken = async (): Promise<Token> => {
  const token = localStorage.getItem('refreshToken');
  try {
    const response = await axios.post<Token>(`https://easydev.club/api/v1/auth/refresh`, {
      refreshToken: token,
    });

    return response.data;
  } catch (error: any) {
    console.log(error);
    const status = error?.request?.status;
    throw new Error(status === 401 ? 'Сессия истекла' : allResposeStatus[status]);
  }
};

export const getUserProfile = async (): Promise<Profile> => {
  try {
    const response = await axiosInstance.get<Profile>(`/user/profile`);
    return response.data;
  } catch (error: any) {
    console.log(error);
    const status = error?.request?.status;
    throw new Error(allResposeStatus[status]);
  }
};

export const updateUserProfile = async (profileData: ProfileRequest): Promise<Profile> => {
  try {
    const response = await axiosInstance.put<Profile>(`/user/profile`, profileData);
    return response.data;
  } catch (error: any) {
    console.log(error);
    const status = error?.request?.status;
    throw new Error(status === 400 ? 'Логин/электронная почта уже используются' : allResposeStatus[status]);
  }
};

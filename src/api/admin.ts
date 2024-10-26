import { axiosInstance } from './axios';
import type { User, MetaResponse, UserRequest } from '@/types/admin';

// ?

export const getAllUsers = async (data: UserRequest | any): Promise<MetaResponse<User>> => {
  try {
    const response = await axiosInstance.get<MetaResponse<User>>(`/admin/users`, data);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error('Не удалось получить пользователей');
  }
};

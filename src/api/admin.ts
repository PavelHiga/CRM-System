import { allResposeStatus } from "@/utils/responseStatus";
import { axiosInstance } from "./axios";
import type { User, MetaResponse, UserRequest, UserUpdate, UserRightsUpdate } from "@/types/admin";

export const getUsersFetch = async (filters: UserRequest): Promise<MetaResponse<User>> => {
  const isBlocked = filters.isBlocked !== undefined ? `isBlocked=${filters.isBlocked}` : "";

  try {
    const response = await axiosInstance.get<MetaResponse<User>>(
      `/admin/users?limit=${filters.limit}&offset=${filters.offset}&search=${filters.search}&sortBy=${filters.sortBy}&sortOrder=${filters.sortOrder}&${isBlocked}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error("Не удалось получить пользователей");
  }
};

export const getOneUser = async (id: string): Promise<User> => {
  try {
    const response = await axiosInstance.get<User>(`/admin/users/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error("Не удалось получить пользователя");
  }
};

export const updateUser = async (id: string, userProfileData: UserUpdate): Promise<User> => {
  try {
    const response = await axiosInstance.put<User>(`/admin/users/${id}`, userProfileData);
    return response.data;
  } catch (error: any) {
    console.log(error);
    const status = error?.request?.status;
    throw new Error(
      status === 400 ? "Логин/электронная почта уже используются" : allResposeStatus[status]
    );
  }
};

export const deleteOneUser = async (id: string) => {
  try {
    const response = await axiosInstance.delete(`/admin/users/${id}`);
  } catch (error: any) {
    console.log(error);
    throw new Error("Не удалось удалить пользователя");
  }
};

export const blockUserFetch = async (id: string): Promise<User> => {
  try {
    const response = await axiosInstance.post<User>(`/admin/users/${id}/block`);
    return response.data;
  } catch (error: any) {
    console.log(error);
    throw new Error("Не удалось заблокировать пользователя");
  }
};

export const unblockUserFetch = async (id: string): Promise<User> => {
  try {
    const response = await axiosInstance.post<User>(`/admin/users/${id}/unblock`);
    return response.data;
  } catch (error: any) {
    console.log(error);
    throw new Error("Не удалось разблокировать пользователя");
  }
};

export const updateUserRightsFetch = async (id: string, data: UserRightsUpdate): Promise<User> => {
  try {
    const response = await axiosInstance.post<User>(`/admin/users/${id}/rights`, data);
    console.log(response);
    return response.data;
  } catch (error: any) {
    console.log(error);
    throw new Error("Не удалось сменить права");
  }
};

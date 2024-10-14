import axios from 'axios';

import type { AuthData, Profile, Token, UserRegistration } from '@/types/authTypes';
import type { MetaResponse, Todo, TodoInfo, TodoRequest } from '@/types/todoTypes';
import { axiosInstance } from '@/utils/axiosInstance';
import { allResposeStatus } from '@/utils/responseStatus';

const API = 'https://easydev.club/api/v1';

// Задачи

export const getAllTodos = async (
  status: 'all' | 'inWork' | 'completed'
): Promise<MetaResponse<Todo, TodoInfo>> => {
  try {
    const response = await axiosInstance.get<MetaResponse<Todo, TodoInfo>>(`/todos?filter=${status}`);
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error('Не удалось получить все задачи');
  }
};

export const createTodo = async (todo: TodoRequest): Promise<Todo> => {
  try {
    const response = await axiosInstance.post<Todo>(`/todos`, todo);
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error('Не удалось создать задачу');
  }
};

export const deleteTodo = async (id: number) => {
  try {
    const response = await axiosInstance.delete(`/todos/${id}`);
  } catch (error) {
    console.log(error);
    throw new Error('Не удалось создать задачу');
  }
};

export const changeTodoStatus = async (todo: Todo): Promise<Todo> => {
  try {
    const response = await axiosInstance.put<Todo>(`/todos/${todo.id}`, {
      isDone: !todo.isDone,
    });

    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error('Не удалось сменить статус задачи');
  }
};

export const editTodo = async (todo: Todo): Promise<Todo> => {
  try {
    const response = await axiosInstance.put<Todo>(`/todos/${todo.id}`, {
      title: todo.title,
    });

    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error('Не удалось редактировать задачу');
  }
};

// Авторизация

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
  const token = JSON.parse(localStorage.getItem('userTokens') || '{}').refreshToken;

  try {
    const response = await axios.post<Token>(`${API}/auth/refresh`, { refreshToken: token }); //  дефолтный axios, чтобы не трогать interceptor
    return response.data;
  } catch (error: any) {
    console.log(error);
    const status = error?.request?.status;
    throw new Error(allResposeStatus[status]);
  }
};

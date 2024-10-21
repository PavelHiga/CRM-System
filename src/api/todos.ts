import type { MetaResponse, Todo, TodoInfo, TodoRequest } from '@/types/todos';
import { axiosInstance } from './axios';

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

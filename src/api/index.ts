import { store } from '@/store/store';
import type { MetaResponse, Todo, TodoInfo, TodoRequest } from '@/types/types';

export const getAllTodos = async (status: string) => {
  const response = await fetch(`https://easydev.club/api/v1/todos?filter=${status}`, {
    method: 'Get',
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const metaResponse: MetaResponse<Todo, TodoInfo> = await response.json();

  store.data = metaResponse;
};

export const createTodo = async (todo: TodoRequest): Promise<Todo> => {
  const response = await fetch('https://easydev.club/api/v1/todos', {
    method: 'Post',
    body: JSON.stringify(todo),
  });

  if (!response.ok) {
    alert('Ошибка');
    throw new Error(response.statusText);
  }

  const result = await response.json();

  store.activeFilterIndex = 0;
  getAllTodos('all');

  return result;
};

export const deleteTodo = async (id: number) => {
  const response = await fetch(`https://easydev.club/api/v1/todos/${id}`, {
    method: 'Delete',
  });

  if (!response.ok) {
    alert('Ошибка');
    throw new Error(response.statusText);
  }

  if (response.status === 200) {
    store.activeFilterIndex = 0;
    getAllTodos('all');
  }
};

export const changeTodoStatus = async (todo: Todo): Promise<Todo> => {
  const response = await fetch(`https://easydev.club/api/v1/todos/${todo.id}`, {
    method: 'Put',
    body: JSON.stringify({
      isDone: !todo.isDone,
    }),
  });

  if (!response.ok) {
    alert('Ошибка');
    throw new Error(response.statusText);
  }

  const result = await response.json();

  store.activeFilterIndex = 0;
  getAllTodos('all');

  return result;
};

export const editTodo = async (todo: Todo): Promise<Todo> => {
  const response = await fetch(`https://easydev.club/api/v1/todos/${todo.id}`, {
    method: 'Put',
    body: JSON.stringify({
      title: todo.title,
    }),
  });

  if (!response.ok) {
    alert('Ошибка');
    throw new Error(response.statusText);
  }

  const result = await response.json();

  store.activeFilterIndex = 0;
  getAllTodos('all');

  return result;
};

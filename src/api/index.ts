import type { MetaResponse, Todo, TodoInfo, TodoRequest } from '@/types/types';

const API = 'https://easydev.club/api/v1';

export const getAllTodos = async (
  status: 'all' | 'inWork' | 'completed'
): Promise<MetaResponse<Todo, TodoInfo>> => {
  const response = await fetch(`${API}/todos?filter=${status}`, {
    method: 'Get',
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const metaResponse: MetaResponse<Todo, TodoInfo> = await response.json();

  return metaResponse;
};

export const createTodo = async (todo: TodoRequest): Promise<Todo> => {
  const response = await fetch(`${API}/todos`, {
    method: 'Post',
    body: JSON.stringify(todo),
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const result = await response.json();

  return result;
};

export const deleteTodo = async (id: number) => {
  const response = await fetch(`${API}/todos/${id}`, {
    method: 'Delete',
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }
};

export const changeTodoStatus = async (todo: Todo): Promise<Todo> => {
  const response = await fetch(`${API}/todos/${todo.id}`, {
    method: 'Put',
    body: JSON.stringify({
      isDone: !todo.isDone,
    }),
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const result = await response.json();

  return result;
};

export const editTodo = async (todo: Todo): Promise<Todo> => {
  const response = await fetch(`${API}/todos/${todo.id}`, {
    method: 'Put',
    body: JSON.stringify({
      title: todo.title,
    }),
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const result = await response.json();

  return result;
};

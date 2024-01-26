import { api } from '@/libs/api';

export interface Todo {
  id: string;
  title: string;
  completed: boolean;
}

export const getTodos = () => {
  return api.get<Todo[]>('todos').then((res) => res.data);
};

export const addTodo = async (title: string) => {
  return api.post<Todo>('todos', { title }).then((res) => res.data);
};

export const deleteTodo = async (id: string) => {
  return api.delete(`todos/${id}`);
};

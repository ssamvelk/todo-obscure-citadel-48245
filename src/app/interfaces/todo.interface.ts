import { ICategory } from './category.interface';

export interface ITodo {
  id: number;
  text: string;
  isCompleted: boolean;
  category?: ICategory;
}

export interface ICreateTodoResponse {
  createTodo: ITodo;
}

export interface IUpdateTodoResponse {
  updateTodo: ITodo;
}

import { ICategory } from './category.interface';

export interface ITodo {
  id: number;
  text: string;
  isCompleted: boolean;
  category?: ICategory;
}

export interface ICreateTodoResponse {
  createTodo2: ITodo;
  createTodo?: ITodo;
}

export interface IPatchTodoResponse {
  patchTodo: ITodo;
}

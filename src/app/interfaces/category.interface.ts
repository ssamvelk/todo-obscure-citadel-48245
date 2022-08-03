import { ITodo } from './todo.interface';

export interface ICategory {
  id: number;
  title: string;
  todos: ITodo[];
}

export interface ICreateCategoryResponse {
  createCategory: ICategory;
}

export interface ICreateCategoryAndTodoResponse {
  createCategory: ICategory;
  createTodo: ITodo;
}

export interface IGetCategoriesResponse {
  categories: ICategory[];
}

export interface IRemoveCategoryResponse {
  removeCategory: number;
}

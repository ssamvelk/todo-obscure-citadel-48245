import { ITodo } from './todo.interface';

export interface ICategory {
  id: number;
  title: string;
  todos: ITodo[];
}

export interface ICreateCategoryResponse {
  createCategory: ICategory;
}

export interface IGetCategoriesResponse {
  categories: ICategory[];
}

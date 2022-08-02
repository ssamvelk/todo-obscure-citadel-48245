import { ICategory } from '../interfaces/category.interface';

export enum URL {
  SERVER_URL = 'https://guarded-springs-48275.herokuapp.com/graphql',
  LOCAL_SERVER_URL = 'http://localhost:3000/graphql',
}

export const mockCategories: ICategory[] = [
  {
    id: 1,
    title: 'Mock category',
    todos: [
      { id: 1, text: 'Mock todo 1', isCompleted: true },
      { id: 2, text: 'Mock todo 2', isCompleted: false },
      { id: 3, text: 'Mock todo 3', isCompleted: true },
    ],
  },
  {
    id: 2,
    title: 'Mock category 2',
    todos: [
      { id: 4, text: 'Mock todo 4', isCompleted: false },
      { id: 5, text: 'Mock todo 5', isCompleted: false },
      { id: 6, text: 'Mock todo 6', isCompleted: false },
    ],
  },
  {
    id: 3,
    title: 'Mock category 3',
    todos: [
      { id: 7, text: 'Mock todo 7', isCompleted: true },
      { id: 8, text: 'Mock todo 8', isCompleted: true },
      { id: 9, text: 'Mock todo 9', isCompleted: true },
    ],
  },
];

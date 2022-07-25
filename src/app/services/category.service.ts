import { Injectable } from '@angular/core';
import { ICategory } from '../interfaces/category.interface';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private categories: ICategory[] = [
    {
      id: 1,
      title: 'Семья',
      todos: [
        { id: 1, text: 'todo 1', isCompleted: true },
        { id: 2, text: 'todo 2', isCompleted: false },
        { id: 3, text: 'todo 3', isCompleted: true },
      ],
    },
    {
      id: 2,
      title: 'Работа',
      todos: [
        { id: 4, text: 'todo 4', isCompleted: false },
        { id: 5, text: 'todo 5', isCompleted: false },
        { id: 6, text: 'todo 6', isCompleted: false },
      ],
    },
    {
      id: 3,
      title: 'Прочее',
      todos: [
        { id: 7, text: 'todo 7', isCompleted: true },
        { id: 8, text: 'todo 8', isCompleted: true },
        { id: 9, text: 'todo 9', isCompleted: true },
      ],
    },
  ];

  constructor() {}

  getCategories() {
    return this.categories;
  }
}

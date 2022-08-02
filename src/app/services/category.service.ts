import { Injectable } from '@angular/core';
import { Apollo, MutationResult } from 'apollo-angular';
import { Subject, Observable } from 'rxjs';
import {
  CREATE_CATEGORY,
  CREATE_CATEGORY_AND_TODO,
  CREATE_TODO,
  GET_CATEGORIES,
  REMOVE_CATEGORY,
  UPDATE_TODO,
} from '../helpers/api';
import {
  ICategory,
  ICreateCategoryAndTodoResponse,
  ICreateCategoryResponse,
  IGetCategoriesResponse,
  IRemoveCategoryResponse,
} from '../interfaces/category.interface';
import {
  ICreateTodoResponse,
  IPatchTodoResponse,
  ITodo,
} from '../interfaces/todo.interface';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  public addNewItemSubject$ = new Subject();

  public updateCategories$ = new Subject<ICategory[]>();
  public deleteCategory$ = new Subject<number>();
  public updateTodoStatus$ = new Subject<ITodo>();

  constructor(private apollo: Apollo) {}

  getCategories() {
    return this.apollo.watchQuery<IGetCategoriesResponse>({
      query: GET_CATEGORIES,
      fetchPolicy: 'network-only',
    }).valueChanges;
  }

  updateTodo(
    id: number,
    isCompleted: boolean
  ): Observable<MutationResult<IPatchTodoResponse>> {
    return this.apollo.mutate<IPatchTodoResponse>({
      mutation: UPDATE_TODO,
      variables: {
        todo: {
          id,
          isCompleted,
        },
      },
    });
  }

  createTodo(
    text: string,
    categoryId: number,
    isCompleted: boolean = false
  ): Observable<MutationResult<ICreateTodoResponse>> {
    return this.apollo.mutate<ICreateTodoResponse>({
      mutation: CREATE_TODO,
      variables: {
        todo: {
          text,
          categoryId,
          isCompleted,
        },
      },
    });
  }

  createCategory(
    title: string
  ): Observable<MutationResult<ICreateCategoryResponse>> {
    return this.apollo.mutate<ICreateCategoryResponse>({
      mutation: CREATE_CATEGORY,
      variables: {
        createCategory: {
          title,
        },
      },
    });
  }

  createCategoryAndTodo(
    categoryTitle: string,
    id: number,
    todoText: string
  ): Observable<MutationResult<ICreateCategoryAndTodoResponse>> {
    return this.apollo.mutate<ICreateCategoryAndTodoResponse>({
      mutation: CREATE_CATEGORY_AND_TODO,
      variables: {
        createCategory: {
          id,
          title: categoryTitle,
        },
        todo: {
          text: todoText,
          categoryId: id,
          isCompleted: false,
        },
      },
    });
  }

  removeCategoryCard(
    id: number
  ): Observable<MutationResult<IRemoveCategoryResponse>> {
    return this.apollo.mutate<IRemoveCategoryResponse>({
      mutation: REMOVE_CATEGORY,
      variables: {
        id,
      },
    });
  }
}

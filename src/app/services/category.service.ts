import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Subject } from 'rxjs';
import {
  CREATE_CATEGORY,
  CREATE_TODO,
  GET_CATEGORIES,
  GET_ONE_CATEGORY,
  GET_ONE_TODO,
  GET_TODOS,
  UPDATE_TODO,
} from '../helpers/api';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  public addNewItemSubject$ = new Subject();

  constructor(private apollo: Apollo) {}

  getCategories() {
    return this.apollo.watchQuery<any>({
      query: GET_CATEGORIES,
      fetchPolicy: 'network-only',
    }).valueChanges;
  }

  getOneCategory(id: number) {
    return this.apollo.watchQuery<any>({
      query: GET_ONE_CATEGORY,
      variables: {
        id,
      },
    }).valueChanges;
  }

  getTodos() {
    return this.apollo.query<any>({
      query: GET_TODOS,
    });
  }

  getOneTodo(id: number) {
    return this.apollo.query<any>({
      query: GET_ONE_TODO,
      variables: {
        id,
      },
    });
  }

  updateTodo(id: number, isCompleted: boolean) {
    return this.apollo.mutate({
      mutation: UPDATE_TODO,
      variables: {
        todo: {
          id,
          isCompleted,
        },
      },
    });
  }

  createTodo(text: string, categoryId: number, isCompleted: boolean = false) {
    return this.apollo.mutate({
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

  createCategory(title: string) {
    return this.apollo.mutate({
      mutation: CREATE_CATEGORY,
      variables: {
        createCategory: {
          title,
        },
      },
    });
  }
}

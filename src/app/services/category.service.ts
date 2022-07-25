import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
// import { ICategory } from '../interfaces/category.interface';
import { GET_CATEGORIES } from '../helpers/queries';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  // categories: ICategory[] = [];

  constructor(private apollo: Apollo) {}

  getCategories() {
    return this.apollo.watchQuery<any>({
      query: GET_CATEGORIES,
    }).valueChanges;
  }
}

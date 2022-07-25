import { Component, OnInit } from '@angular/core';
import { mockCategories } from 'src/app/helpers/constants';
import { ICategory } from 'src/app/interfaces/category.interface';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent implements OnInit {
  categories: ICategory[] = [];
  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe({
      next: (categories) => {
        console.log('data', categories);
        this.categories = categories.data.categories;
      },
      error: (e) => {
        console.log('error', e);
        this.categories = mockCategories;
      },
    });
  }
}

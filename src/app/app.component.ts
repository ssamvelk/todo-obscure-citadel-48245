import { Component, OnInit } from '@angular/core';
import { plainToInstance } from 'class-transformer';
import { take } from 'rxjs';
import { Category } from './interfaces/Category';
import { ICategory } from './interfaces/category.interface';
import { CategoryService } from './services/category.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public allCategories: ICategory[] = [];

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.categoryService
      .getCategories()
      .pipe(take(1))
      .subscribe((categories) => {
        this.allCategories = plainToInstance(
          Category,
          categories.data.categories
        );
      });

    this.categoryService.updateCategories$.subscribe((data) => {
      this.allCategories = plainToInstance(Category, data);
    });

    this.categoryService.deleteCategory$.subscribe((categoryId: number) => {
      this.allCategories = this.allCategories.filter(
        (category: ICategory) => +category.id !== categoryId
      );
    });

    this.categoryService.updateTodoStatus$.subscribe((data) => {
      const currentCategory = this.allCategories.find(
        (el) => el.id === data.category?.id
      );

      if (currentCategory) {
        const todo = currentCategory.todos.find((todo) => todo.id === data.id);

        if (todo) {
          todo.isCompleted = data.isCompleted;
          this.categoryService.updateCategories$.next(this.allCategories);
        }
      }
    });
  }
}

import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
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
  constructor(
    private categoryService: CategoryService,
    private cd: ChangeDetectorRef
  ) {
    // this.test();
  }

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe({
      next: (categories) => {
        console.log('categories', categories);
        if (categories.data.categories) {
          this.categories = categories.data.categories;
        }
      },
      error: (e) => {
        console.log('Error', e);
        this.categories = mockCategories;
      },
    });

    this.categoryService.subject$.subscribe(() => {
      console.log('Нужно обновить!!!');
      this.cd.detectChanges();
    });
  }

  logger(e: any) {
    console.log(e);
  }

  changeTodoStatus(id: number, status: boolean) {
    this.categoryService.updateTodo(id, status).subscribe();
  }

  test() {
    this.categoryService.getOneCategory(1).subscribe({
      next: (category) => {
        console.log('category', category);
      },
      error: (e) => {
        console.log('Error', e);
      },
    });

    this.categoryService.getTodos().subscribe({
      next: (todos) => {
        console.log('TODOS', todos);
      },
      error: (e) => {
        console.log('Error', e);
      },
    });

    this.categoryService.getOneTodo(1).subscribe({
      next: (todo) => {
        console.log(`TODO № ${todo.data.getOneTodo.id} = `, todo);
      },
      error: (e) => {
        console.log('Error', e);
      },
    });
  }
}

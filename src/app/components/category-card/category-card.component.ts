import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { MatListOption } from '@angular/material/list';
import { MatSnackBar } from '@angular/material/snack-bar';
import { take } from 'rxjs';
import { ICategory } from 'src/app/interfaces/category.interface';
import { ITodo } from 'src/app/interfaces/todo.interface';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-category-card',
  templateUrl: './category-card.component.html',
  styleUrls: ['./category-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryCardComponent implements OnInit {
  @Input() category!: ICategory;

  constructor(
    private categoryService: CategoryService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  changeTodoStatus(id: number, status: boolean) {
    this.categoryService
      .updateTodo(id, status)
      .pipe(take(1))
      .subscribe(({ data }) => {
        if (data?.updateTodo) {
          this.categoryService.updateTodoStatus$.next(data.updateTodo);
        }
      });
  }

  removeCategoryCard(id: number, title: string) {
    this.categoryService
      .removeCategoryCard(id)
      .pipe(take(1))
      .subscribe(({ data }) => {
        if (data) {
          this.categoryService.deleteCategory$.next(data.removeCategory);
          this._snackBar.open(`Категория удалена.`, title, {
            duration: 2000,
          });
        }
      });
  }

  trackByFn(index: number, item: ITodo): number {
    return item.id;
  }
}

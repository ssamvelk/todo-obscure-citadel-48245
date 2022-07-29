import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { take } from 'rxjs';
import { ICategory } from 'src/app/interfaces/category.interface';
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
      .subscribe(() => {
        this.categoryService.addNewItemSubject$.next(true);
      });
  }

  removeCategoryCard(id: number, title: string) {
    this.categoryService
      .removeCategoryCard(id)
      .pipe(take(1))
      .subscribe(() => {
        this.categoryService.addNewItemSubject$.next(true);
        this._snackBar.open(`Категория удалена.`, title, {
          duration: 2000,
        });
      });
  }
}

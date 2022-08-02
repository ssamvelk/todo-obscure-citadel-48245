import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DoCheck,
  Input,
  OnInit,
} from '@angular/core';
import { map } from 'rxjs';
import { mockCategories } from 'src/app/helpers/constants';
import { ICategory } from 'src/app/interfaces/category.interface';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoriesComponent {
  @Input() categories: ICategory[] = [];
  // constructor(
  //   private categoryService: CategoryService,
  //   private cd: ChangeDetectorRef
  // ) {}

  // changeTodoStatus(id: number, status: boolean) {
  //   this.categoryService.updateTodo(id, status).subscribe();
  // }

  trackByFn(index: number, item: ICategory): number {
    return item.id;
  }
}

import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DoCheck,
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
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoriesComponent implements OnInit, DoCheck {
  categories: ICategory[] = [];

  cat$ = this.categoryService
    .getCategories()
    .pipe(map((data) => [...data.data.categories]));

  constructor(
    private categoryService: CategoryService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    // this.categoryService.getCategories().subscribe({
    //   next: (categories) => {
    //     console.log('categories', categories);
    //     if (categories.data.categories) {
    //       this.categories = [...categories.data.categories];
    //     }
    //   },
    //   error: (e) => {
    //     console.log('Error', e);
    //     this.categories = mockCategories;
    //   },
    // });

    this.categoryService.subject$.subscribe(() => {
      console.log('subject$ next!!!');

      this.cd.detectChanges();
      this.cd.markForCheck();
      // document.location.reload(); // Кастыль на время
    });
  }

  ngDoCheck(): void {
    console.log('DoCheck');
    this.cd.markForCheck();
  }

  changeTodoStatus(id: number, status: boolean) {
    this.categoryService.updateTodo(id, status).subscribe();
  }
}

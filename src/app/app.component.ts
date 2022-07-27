import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { startWith, take } from 'rxjs';
import {
  ICategory,
  IGetCategoriesResponse,
} from './interfaces/category.interface';
import { CategoryService } from './services/category.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  allCategories: ICategory[] = [];

  constructor(
    private categoryService: CategoryService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.categoryService.addNewItemSubject$
      .pipe(startWith(true))
      .subscribe(() => {
        this.categoryService
          .getCategories()
          .pipe(take(1))
          .subscribe(({ data }) => {
            this.allCategories = [
              ...(data as IGetCategoriesResponse).categories,
            ];
            this.cd.detectChanges();
          });
      });
  }
}

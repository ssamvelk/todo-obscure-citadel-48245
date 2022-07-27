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
export class CategoriesComponent implements OnInit {
  @Input() categories: ICategory[] = [];

  // categories$ = this.categoryService
  //   .getCategories()
  //   .pipe(map((data) => [...data.data.categories]));

  constructor(
    private categoryService: CategoryService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    // this.categoryService.addNewItemSubject$.subscribe(() => {
    //   console.log('subject$ next!!!');
    //   this.cd.detectChanges();
    //   this.cd.markForCheck();
    //   document.location.reload(); // Кастыль на время
    // });
  }

  changeTodoStatus(id: number, status: boolean) {
    this.categoryService.updateTodo(id, status).subscribe();
  }
}

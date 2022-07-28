import { Component, Input, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { ICategory } from 'src/app/interfaces/category.interface';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-category-card',
  templateUrl: './category-card.component.html',
  styleUrls: ['./category-card.component.scss'],
})
export class CategoryCardComponent implements OnInit {
  @Input() category!: ICategory;

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {}

  changeTodoStatus(id: number, status: boolean) {
    this.categoryService.updateTodo(id, status).pipe(take(1)).subscribe();
  }

  removeCategoryCard(id: number) {
    console.log('removeCategoryCard', id);
    this.categoryService
      .removeCategoryCard(id)
      .pipe(take(1))
      .subscribe(() => {
        this.categoryService.addNewItemSubject$.next(true);
      });
  }
}

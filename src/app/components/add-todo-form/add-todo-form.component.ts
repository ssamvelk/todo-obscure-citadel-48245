import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from 'src/app/services/category.service';
import { concatMap, map, Observable } from 'rxjs';
import {
  ICategory,
  ICreateCategoryResponse,
  IGetCategoriesResponse,
} from 'src/app/interfaces/category.interface';

@Component({
  selector: 'app-add-todo-form',
  templateUrl: './add-todo-form.component.html',
  styleUrls: ['./add-todo-form.component.scss'],
})
export class AddTodoFormComponent implements OnInit {
  public addTodoForm!: FormGroup;
  // @Input() categories: ICategory[] = [];

  // : Observable<ApolloQueryResult<any>>
  public cat$ = this.categoryService.getCategories().pipe(
    map((categories) => {
      return categories.data.categories;
    })
  );

  constructor(
    private categoryService: CategoryService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.cat$.subscribe((data) => console.log('data cat$', data));

    this.addTodoForm = new FormGroup({
      todoText: new FormControl('', [Validators.required]),
      existCategory: new FormControl(''),
      newCategory: new FormControl('', [Validators.required]),
    });
  }

  submit() {
    if (
      !this.addTodoForm.value.existCategory &&
      this.addTodoForm.value.newCategory
    ) {
      this.categoryService
        .createCategory(this.addTodoForm.value.newCategory)
        .pipe(
          concatMap((categoryInfo) => {
            const { id } = (categoryInfo.data as ICreateCategoryResponse)
              .createCategory;
            return this.categoryService.createTodo(
              this.addTodoForm.value.todoText,
              +id
            );
          })
        )
        .subscribe(() => {
          this.categoryService.addNewItemSubject$.next(true);
        });
    } else {
      this.categoryService
        .createTodo(
          this.addTodoForm.value.todoText,
          +this.addTodoForm.value.existCategory
        )
        .subscribe(() => {
          this.categoryService.addNewItemSubject$.next(true);
        });
    }
  }

  createTodo(text: string, categoryId: number, isCompleted: boolean) {
    return this.categoryService.createTodo(text, categoryId, isCompleted);
  }

  deleteCategory() {}
  deleteTodo() {}

  isButtonDisabled() {
    if (!this.addTodoForm.value.todoText) {
      return true;
    } else if (
      !this.addTodoForm.value.existCategory &&
      !this.addTodoForm.value.newCategory
    ) {
      return true;
    } else return false;
  }
}

import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from 'src/app/services/category.service';
import { concatMap, map, take } from 'rxjs';
import { ICategory } from 'src/app/interfaces/category.interface';

@Component({
  selector: 'app-add-todo-form',
  templateUrl: './add-todo-form.component.html',
  styleUrls: ['./add-todo-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddTodoFormComponent implements OnInit {
  public addTodoForm!: FormGroup;

  @Input() public categories: ICategory[] = [];

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
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
      if (this.categories.length) {
        const categoryId = this.getMaxCategoryId();

        this.categoryService
          .createCategoryAndTodo(
            this.addTodoForm.value.newCategory,
            categoryId + 1,
            this.addTodoForm.value.todoText
          )
          .pipe(take(1))
          .subscribe(({ data }) => {
            if (data) {
              const newCategory = data.createCategory2;
              newCategory.todos = [data.createTodo2];

              this.categoryService.updateCategories$.next([
                ...this.categories,
                newCategory,
              ]);
            }
          });
      } else {
        let tempCategory: ICategory;

        this.categoryService
          .createCategory(this.addTodoForm.value.newCategory)
          .pipe(
            concatMap(({ data }) => {
              const newCategory = data!.createCategory;
              const { id } = newCategory;

              tempCategory = { ...newCategory, todos: [] };

              return this.categoryService.createTodo(
                this.addTodoForm.value.todoText,
                +id
              );
            }),
            take(1)
          )
          .subscribe(({ data }) => {
            const newTodo = data?.createTodo2;

            if (newTodo) {
              const categoriesCopy: ICategory[] = [
                ...this.categories,
                tempCategory,
              ];
              const currentCategory = categoriesCopy.find(
                (category) => category.id === newTodo.category?.id
              );

              if (currentCategory?.todos) {
                currentCategory.todos.push(newTodo);
                this.categoryService.updateCategories$.next(categoriesCopy);
              }
            }
          });
      }
    } else {
      this.categoryService
        .createTodo(
          this.addTodoForm.value.todoText,
          +this.addTodoForm.value.existCategory
        )
        .pipe(take(1))
        .subscribe(({ data }) => {
          const newTodo = data?.createTodo2;

          if (newTodo) {
            const currentCategory = this.categories.find(
              (category) => category.id === newTodo.category?.id
            );

            if (currentCategory?.todos) {
              currentCategory.todos.push(newTodo);
              this.categoryService.updateCategories$.next(this.categories);
            }
          }
        });
    }
  }

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

  trackByFn(index: number, item: ICategory): number {
    return item.id;
  }

  getMaxCategoryId() {
    return Math.max(...this.categories.map((el) => +el.id));
  }
}

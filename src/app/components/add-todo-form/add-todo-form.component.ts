import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-add-todo-form',
  templateUrl: './add-todo-form.component.html',
  styleUrls: ['./add-todo-form.component.scss'],
})
export class AddTodoFormComponent implements OnInit {
  addTodoForm!: FormGroup;
  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.addTodoForm = new FormGroup({
      todoText: new FormControl('', []),
      existCategory: new FormControl(''),
      newCategory: new FormControl(''),
    });
  }

  submit() {
    console.log('addTodoForm', this.addTodoForm.value);
    if (
      !this.addTodoForm.value.existCategory &&
      this.addTodoForm.value.newCategory
    ) {
      console.log('Создать новую категорию!!!');
      this.categoryService
        .createCategory(this.addTodoForm.value.newCategory)
        .subscribe((data) => {
          console.log('Создал новую категорию data', data);
        });
    } else {
      console.log('Поместить туду в существующую категорию!');
    }
  }

  createCategory(title: string) {
    this.categoryService.createCategory(title).subscribe({
      next: (category) => {
        console.log('CreateCategory', category);
      },
      error: (e) => {
        console.log('Error', e);
      },
    });
  }

  createTodo() {}

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

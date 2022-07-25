import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-todo-form',
  templateUrl: './add-todo-form.component.html',
  styleUrls: ['./add-todo-form.component.scss'],
})
export class AddTodoFormComponent implements OnInit {
  addTodoForm!: FormGroup;
  // constructor() {}

  ngOnInit(): void {
    this.addTodoForm = new FormGroup({
      todoText: new FormControl('', []),
      existCategory: new FormControl(''),
      newCategory: new FormControl(''),
    });
  }

  submit() {
    console.log('this.addTodoForm', this.addTodoForm);
  }
}

import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ICategory } from 'src/app/interfaces/category.interface';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @Input() categories: ICategory[] = [];

  constructor(public dialog: MatDialog) {}

  openDialog(
    enterAnimationDuration: string = '500ms',
    exitAnimationDuration: string = '500ms',
    categories = this.categories
  ): void {
    this.dialog.open(DialogComponent, {
      width: '400px',
      autoFocus: true,
      enterAnimationDuration,
      exitAnimationDuration,
      data: {
        categories,
      },
    });
  }
}

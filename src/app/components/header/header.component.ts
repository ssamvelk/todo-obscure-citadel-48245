import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  constructor(public dialog: MatDialog) {}

  openDialog(
    enterAnimationDuration: string = '500ms',
    exitAnimationDuration: string = '500ms'
  ): void {
    this.dialog.open(DialogComponent, {
      width: '400px',
      autoFocus: true,
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }
}

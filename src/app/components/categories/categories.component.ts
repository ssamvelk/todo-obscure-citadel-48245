import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ICategory } from 'src/app/interfaces/category.interface';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoriesComponent {
  @Input() categories: ICategory[] = [];

  trackByFn(index: number, item: ICategory): number {
    return item.id;
  }
}

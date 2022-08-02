import { Expose, Type } from 'class-transformer';
import { Category } from './Category';

export class Todo {
  @Expose()
  id: number;

  @Expose()
  text: string;

  @Expose()
  isCompleted: boolean;

  @Type(() => Category)
  category?: Category;
}

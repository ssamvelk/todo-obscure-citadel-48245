import { Expose, Type } from 'class-transformer';
import { Todo } from './Todo';

export class Category {
  @Expose()
  id: number;

  @Expose()
  title: string;

  @Expose()
  @Type(() => Todo)
  todos: Todo[];
}

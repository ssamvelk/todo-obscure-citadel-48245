import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sort',
})
export class SortPipe implements PipeTransform {
  transform(array: any): any[] {
    if (!Array.isArray(array)) {
      return [];
    }
    array.sort((a: any, b: any) => {
      if (Number(a.id) < Number(b.id)) {
        return -1;
      } else if (Number(a.id) > Number(b.id)) {
        return 1;
      } else {
        return 0;
      }
    });
    return array;
  }
}

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'trueOrNull'
})
export class TrueOrNullPipe implements PipeTransform {
  transform(value: unknown): boolean {
    return value === true
      ? true
      : null;
  }
}

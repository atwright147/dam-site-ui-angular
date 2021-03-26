import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'negate'
})
export class NegatePipe implements PipeTransform {
  transform(value: boolean): boolean {
    if (typeof value !== 'boolean') {
      throw new Error(`Negate Pipe can only invert booleans, value was type "${typeof value}"`);
    }

    return !value;
  }
}

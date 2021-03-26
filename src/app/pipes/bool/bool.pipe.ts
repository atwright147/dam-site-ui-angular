import { Pipe, PipeTransform } from '@angular/core';

const isObject = (value): boolean => {
  const type = typeof value;
  return value != null && (type === 'object' || type === 'function');
};

@Pipe({
  name: 'bool'
})
export class BoolPipe implements PipeTransform {
  transform(value: unknown): boolean {
    if (Array.isArray(value) && !value.length) {
      return false;
    }

    if (isObject(value) && !Object.keys(value).length) {
      return false;
    }

    return !!value;
  }
}

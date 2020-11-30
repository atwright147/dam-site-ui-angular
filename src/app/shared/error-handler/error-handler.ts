import { ErrorHandler } from '@angular/core';

export class CustomErrorHandler implements ErrorHandler {
  constructor() { }

  handleError(err): void {
    console.info('Custom ErrorHandler caught an error');
    console.info(err);
  }
}

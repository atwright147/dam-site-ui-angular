import { ErrorHandler } from '@angular/core';

export class CustomErrorHandler implements ErrorHandler {
  constructor() { }

  handleError(err): void {
    console.info('Cor blimey, an error occurred');
  }
}

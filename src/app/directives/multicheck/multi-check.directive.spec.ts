import { FormGroupDirective } from '@angular/forms';

import { MultiCheckDirective } from './multi-check.directive';

describe('MultiCheckDirective', () => {
  it('should create an instance', () => {
    const el = document.createElement('div');
    const formGroupDirective = new FormGroupDirective([], []);

    const directive = new MultiCheckDirective(el as any, formGroupDirective);
    expect(directive).toBeTruthy();
  });
});

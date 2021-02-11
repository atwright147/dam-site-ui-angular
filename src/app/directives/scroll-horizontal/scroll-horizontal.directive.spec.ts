import { ScrollHorizontalDirective } from './scroll-horizontal.directive';

describe('ScrollHorizontalDirective', () => {
  it('should create an instance', () => {
    const el = document.createElement('div');

    const directive = new ScrollHorizontalDirective(el as any);
    expect(directive).toBeTruthy();
  });
});

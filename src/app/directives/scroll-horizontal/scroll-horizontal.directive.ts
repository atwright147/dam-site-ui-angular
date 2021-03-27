import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appScrollHorizontal]'
})
export class ScrollHorizontalDirective {
  private readonly hostElement: ElementRef<Element>;

  constructor(
    el: ElementRef,
  ) {
    this.hostElement = el;
  }

  @HostListener('wheel', ['$event'])
  onScroll(event: WheelEvent): void {
    // https://codepen.io/anon/pen/rbzMwN
    const scrollAmount = 65;
    event.preventDefault();

    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    event.deltaY > 0
      ? this.hostElement.nativeElement.scrollLeft += scrollAmount
      : this.hostElement.nativeElement.scrollLeft -= scrollAmount;
  }
}

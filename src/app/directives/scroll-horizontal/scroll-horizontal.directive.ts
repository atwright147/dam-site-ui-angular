import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appScrollHorizontal]'
})
export class ScrollHorizontalDirective {
  hostElement: ElementRef<Element>;

  constructor(
    el: ElementRef,
  ) {
    this.hostElement = el;
  }

  @HostListener('wheel', ['$event'])
  onScroll(event: WheelEvent): void {
    const scrollAmount = 65;

    // https://codepen.io/anon/pen/rbzMwN
    event.preventDefault();
    event.deltaY > 0
      ? this.hostElement.nativeElement.scrollLeft += scrollAmount
      : this.hostElement.nativeElement.scrollLeft -= scrollAmount;
  }
}

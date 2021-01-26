import { AfterViewInit, Directive, ElementRef, HostListener, Input } from '@angular/core';
import { FormGroup, FormGroupDirective } from '@angular/forms';

const range = (a: number, b: number) => Array(Math.abs(a - b) + 1).fill(a).map((v: number, i: number) => v + i * (a > b ? -1 : 1));

@Directive({
  selector: '[appMultiCheck]'
})
export class MultiCheckDirective implements AfterViewInit {
  @Input('appMultiCheck') formGroupName: string;

  hostElement: ElementRef<Element>;
  formGroup: FormGroupDirective;
  checkboxes: NodeList;
  startIndex = 0;
  inputTargetState: boolean;

  constructor(
    el: ElementRef,
    formGroupDirective: FormGroupDirective,
  ) {
    this.hostElement = el;
    this.formGroup = formGroupDirective;
  }

  ngAfterViewInit(): void {
    setTimeout(() => this.checkboxes = this.hostElement.nativeElement.querySelectorAll('input[type="checkbox"]'), 500);
  }

  @HostListener('click', ['$event'])
  onClick(event: MouseEvent): void {
    if (event.target === this.hostElement.nativeElement) {
      throw new Error('Event target should have been a child element but was host element');
    }

    let targetInputElement: HTMLInputElement;
    switch ((event.target as Element).tagName) {
      case 'DIV':
        targetInputElement = (event.target as Element).closest('app-thumbnail').querySelector('input[type="checkbox"]');
        break;

      case 'LABEL':
        targetInputElement = (event.target as Element).parentElement.closest('app-thumbnail').querySelector('input[type="checkbox"]');
        break;

      case 'INPUT':
        targetInputElement = event.target as HTMLInputElement;
        break;

      default:
        throw new Error('Event target was not a recognised element type');
    }

    // const index = Array.prototype.indexOf.call(this.checkboxes, targetInputElement);
    const inputNames = Array.from(this.checkboxes).map((item: HTMLInputElement) => item.name);
    const index = inputNames.indexOf(targetInputElement.name);
    const checkboxGroup = this.formGroup.form.get(this.formGroupName) as FormGroup;
    const checkboxGroupKeys = Object.keys(checkboxGroup.controls);

    if (event.shiftKey) {
      if (index === this.startIndex) {
        return;
      }

      let controlsRange: number[];
      if (index > this.startIndex) {
        controlsRange = range(this.startIndex, index);
      } else {
        controlsRange = range(index, this.startIndex);
      }

      for (const controlIndex of controlsRange) {
        checkboxGroup.get(checkboxGroupKeys[controlIndex]).setValue(this.inputTargetState);
      }
    } else if (event.ctrlKey || event.metaKey) {
      this.startIndex = index;
    } else {
      this.startIndex = index;

      checkboxGroup.get(checkboxGroupKeys[index]).valueChanges.subscribe(
        (data: boolean) => this.inputTargetState = data,
      );

      const controlsRange = range(0, this.checkboxes.length - 1);

      for (const controlIndex of controlsRange) {
        checkboxGroup.get(checkboxGroupKeys[controlIndex]).setValue(false);
      }

      checkboxGroup.get(checkboxGroupKeys[index]).setValue(true);
    }
  }
}

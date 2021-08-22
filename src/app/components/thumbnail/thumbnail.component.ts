import { ChangeDetectionStrategy, Component, ElementRef, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

// https://alligator.io/angular/custom-form-control/

@Component({
  selector: 'app-thumbnail',
  templateUrl: './thumbnail.component.html',
  styleUrls: ['./thumbnail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ThumbnailComponent),
      multi: true
    }
  ],
})
export class ThumbnailComponent implements ControlValueAccessor {
  @Input() disabled = false;
  @Input() imageUrl: string;
  @Input() imageId: string;
  @Input() index: number;
  @Input() value: boolean;

  orientationClassName = '';
  @Input()
  set orientation(value: string) {
    this.orientationClassName = `exif-orientation-${value}`;
  }

  constructor(public elem: ElementRef) { }

  // Function to call when the model changes.
  onChange = (value: boolean): void => {
    this.value = value;
  };

  // Function to call when the input is touched.
  onTouched = (): void => {};

  toggle(): void {
    if (!this.disabled) {
      this.value = !this.value;
      this.writeValue(this.value);
    }
  }

  // Allows Angular to update the model.
  // Update the model and changes needed for the view here.
  writeValue(value: boolean): void {
    this.onChange(value);
  }

  // Allows Angular to register a function to call when the model changes.
  // Save the function as a property to call later here.
  registerOnChange(fn: (value: boolean) => void): void {
    this.onChange = fn;
  }

  // Allows Angular to register a function to call when the input has been touched.
  // Save the function as a property to call later here.
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  // Allows Angular to disable the input.
  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}

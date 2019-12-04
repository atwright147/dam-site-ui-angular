import { Component, Input, forwardRef, HostBinding } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-thumbnail',
  templateUrl: './thumbnail.component.html',
  styleUrls: ['./thumbnail.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ThumbnailComponent),
      multi: true
    }
  ]
})
export class ThumbnailComponent implements ControlValueAccessor {
  @HostBinding('attr.id')
  externalId = '';

  @Input()
  set id(value: string) {
    this._ID = value;
    this.externalId = null;
  }

  @Input() imageUrl: string;
  @Input() imageId: string;
  @Input() index: number;

  get id() {
    return this._ID;
  }

  private _ID = '';

  @Input('value') _value = false;
  onChange: any = () => {};
  onTouched: any = () => {};

  get value() {
    return this._value;
  }

  set value(val) {
    this._value = val;
    this.onChange(val);
    this.onTouched();
  }

  constructor() {}

  registerOnChange(fn) {
    this.onChange = fn;
  }

  writeValue(value) {
    if (value) {
      this.value = value;
    }
  }

  registerOnTouched(fn) {
    this.onTouched = fn;
  }

  switch() {
    this.value = !this.value;
  }
}

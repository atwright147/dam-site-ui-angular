import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { Image } from '../../interfaces/image';

@Injectable({
  providedIn: 'root'
})
export class ImagesService {
  private _images = new BehaviorSubject<Image[]>([]);
  private _selected = new BehaviorSubject<Image[]>([]);
  private _previewSelection = new BehaviorSubject<Image[]>([]);

  images$: Observable<Image[]> = this._images.asObservable();
  selected$: Observable<Image[]> = this._selected.asObservable();
  previewSelection$: Observable<Image[]> = this._previewSelection.asObservable();

  get selected() {
    return this._selected.value;
  }

  set selected(images: Image[]) {
    this._selected.next(images);
  }

  get previewSelection() {
    return this._previewSelection.value;
  }

  set previewSelection(images: Image[]) {
    this._previewSelection.next(images);
  }
}

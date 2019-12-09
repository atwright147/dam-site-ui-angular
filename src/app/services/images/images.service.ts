import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { Image } from '../../interfaces/image';

@Injectable({
  providedIn: 'root'
})
export class ImagesService {
  private _images = new BehaviorSubject<Image[]>([]);
  private _selected = new BehaviorSubject<Image[]>([]);

  images$: Observable<Image[]> = this._images.asObservable();
  selected$: Observable<Image[]> = this._selected.asObservable();

  get selected() {
    return this._selected.value;
  }

  set selected(images: Image[]) {
    this._selected.next(images);
  }
}

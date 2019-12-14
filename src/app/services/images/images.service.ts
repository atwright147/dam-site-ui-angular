import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { Image } from '../../interfaces/image';

@Injectable({
  providedIn: 'root'
})
export class ImagesService {
  private readonly _images = new BehaviorSubject<Image[]>([]);
  private readonly _selected = new BehaviorSubject<Image[]>([]);
  private readonly _previewSelection = new BehaviorSubject<Image[]>([]);

  constructor(
    private readonly http: HttpClient,
  ) {}

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

  fetch() {
    return this.http.get('/api/v1/media');
  }
}

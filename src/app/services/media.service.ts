import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

import { Image } from '../interfaces/image';

@Injectable({
  providedIn: 'root'
})
export class MediaService {
  private _path: string;
  private readonly _images = new BehaviorSubject<Image[]>([]);
  private readonly _selected = new BehaviorSubject<Image[]>([]);
  private readonly _previewSelection = new BehaviorSubject<Image[]>([]);

  constructor(
    private readonly http: HttpClient,
  ) {}

  images$: Observable<Image[]> = this._images.asObservable();
  selected$: Observable<Image[]> = this._selected.asObservable();
  previewSelection$: Observable<Image[]> = this._previewSelection.asObservable();

  get path() {
    if (!this._path) {
      this._path = !localStorage.getItem('path') ? '/' : localStorage.getItem('path');
    }
    return this._path;
  }

  set path(path: string) {
    localStorage.setItem('path', path);
    this._path = path;
  }

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
    const params = new HttpParams().set('path', this.path);
    return this.http.get('/api/v1/media', { params });
  }
}

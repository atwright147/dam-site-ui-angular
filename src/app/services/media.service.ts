import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

import { Image } from '../interfaces/image';

@Injectable({
  providedIn: 'root'
})
export class MediaService {
  private readonly _path = new BehaviorSubject<string>('');
  private readonly _images = new BehaviorSubject<Image[]>([]);
  private readonly _selected = new BehaviorSubject<Image[]>([]);
  private readonly _previewSelection = new BehaviorSubject<Image[]>([]);

  constructor(
    private readonly http: HttpClient,
  ) {}

  images$: Observable<Image[]> = this._images.asObservable();
  selected$: Observable<Image[]> = this._selected.asObservable();
  previewSelection$: Observable<Image[]> = this._previewSelection.asObservable();

  get path$() {
    if (!this._path.value) {
      const newPath = !localStorage.getItem('path') ? '/' : localStorage.getItem('path');
      this._path.next(newPath);
    }
    return this._path.asObservable();
  }

  setPath(path: string) {
    localStorage.setItem('path', path);
    this._path.next(path);
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

  /**
   * Fetches files and folders from `/api/v1/media?path=${path}`
   */
  fetch() {
    const params = new HttpParams().set('path', this._path.value);
    return this.http.get<[]>('/api/v1/files', { params });
    // return this.http.get<[]>('/api/files');
  }

  /**
   * Fetches all folders from `/api/v1/folders`
   */
  fetchFolders() {
    return this.http.get('/api/v1/folders');
  }
}

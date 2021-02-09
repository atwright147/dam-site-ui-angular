import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { IFile } from '../interfaces/files.interface';

export interface IMedia {
  media: IFile[];
  dates: string[];
}

@Injectable({
  providedIn: 'root'
})
export class MediaService {
  orientations: Record<string, string>[] = [];
  private readonly _path = new BehaviorSubject<string>('');
  private readonly _images = new BehaviorSubject<IFile[]>([]);
  private readonly _orientations = new BehaviorSubject<Record<string, string>[]>([]);
  private readonly _selected = new BehaviorSubject<IFile[]>([]);
  private readonly _previewSelection = new BehaviorSubject<IFile[]>([]);
  private readonly _dates = new BehaviorSubject<string[]>([]);

  constructor(
    private readonly http: HttpClient,
  ) {}

  images$: Observable<IFile[]> = this._images.asObservable();
  orientations$: Observable<Record<string, string>[]> = this._orientations.asObservable();
  selected$: Observable<IFile[]> = this._selected.asObservable();
  previewSelection$: Observable<IFile[]> = this._previewSelection.asObservable();
  dates$: Observable<string[]> = this._dates.asObservable();

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

  set selected(images: IFile[]) {
    this._selected.next(images);
  }

  get previewSelection() {
    return this._previewSelection.value;
  }

  set previewSelection(images: IFile[]) {
    this._previewSelection.next(images);
  }

  /**
   * Fetches files and folders from `/api/v1/photos`
   * Use to initiate BehaviorSubjects
   */
  fetch() {
    return this.http
      .get<IMedia>('/api/v1/photos')
      .pipe(
        tap((data) => {
          this._orientations.next(this.getOrientation(data.media));
          this._images.next(data.media);
          this._dates.next(data.dates);
        }),
      );
  }

  /**
   * Fetches all folders from `/api/v1/folders`
   */
  fetchFolders() {
    return this.http.get('/api/v1/folders');
  }

  getOrientation(images: IFile[]): Record<string, string>[] {
    return images.map(image => {
      const imageOrientation = {};
      imageOrientation[image.id] = image.Orientation ?? '0';
      return imageOrientation;
    });
  }
}

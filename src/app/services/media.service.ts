import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

export interface IMediaItem {
  id: string;
  url: string;
  filename: string;
  path: string;
  camera: string;
  lens: string;
}

export interface IMedia {
  media: IMediaItem[];
  dates: string[];
}

@Injectable({
  providedIn: 'root'
})
export class MediaService {
  private readonly _path = new BehaviorSubject<string>('');
  private readonly _images = new BehaviorSubject<IMediaItem[]>([]);
  private readonly _selected = new BehaviorSubject<IMediaItem[]>([]);
  private readonly _previewSelection = new BehaviorSubject<IMediaItem[]>([]);
  private readonly _dates = new BehaviorSubject<string[]>([]);

  constructor(
    private readonly http: HttpClient,
  ) {}

  images$: Observable<IMediaItem[]> = this._images.asObservable();
  selected$: Observable<IMediaItem[]> = this._selected.asObservable();
  previewSelection$: Observable<IMediaItem[]> = this._previewSelection.asObservable();
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

  set selected(images: IMediaItem[]) {
    this._selected.next(images);
  }

  get previewSelection() {
    return this._previewSelection.value;
  }

  set previewSelection(images: IMediaItem[]) {
    this._previewSelection.next(images);
  }

  /**
   * Fetches files and folders from `/api/v1/media`
   * Use to initiate BehaviorSubjects
   */
  fetch() {
    return this.http
      .get<IMedia>('/api/v1/media')
      .pipe(
        tap((data) => {
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
}

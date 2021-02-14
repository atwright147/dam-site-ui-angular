import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { IFile } from '../interfaces/files.interface';

export interface IMedia {
  quantity: number;
  media: IFile[];
}

export interface IDates {
  quantity: number;
  dates: string[];
}

export interface IFilter {
  year: string;
  month: number | null;
}

@Injectable({
  providedIn: 'root'
})
export class MediaService {
  orientations: Record<string, string>[] = [];
  private readonly _path = new BehaviorSubject<string>('');
  private readonly _images = new BehaviorSubject<IFile[]>([]);
  private readonly _orientations = new BehaviorSubject<Record<string, string>>({});
  private readonly _selected = new BehaviorSubject<IFile[]>([]);
  private readonly _previewSelection = new BehaviorSubject<IFile[]>([]);
  private readonly _dates = new BehaviorSubject<string[]>([]);

  constructor(
    private readonly http: HttpClient,
  ) {}

  images$: Observable<IFile[]> = this._images.asObservable();
  orientations$: Observable<Record<string, string>> = this._orientations.asObservable();
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
  fetchDates() {
    return this.http
      .get<IDates>('/api/v1/dates')
      .pipe(
        tap((data) => {
          this._dates.next(data.dates);
        }),
      );
  }

  /**
   * Fetches files and folders from `/api/v1/photos`
   * Use to initiate BehaviorSubjects
   */
  fetchMedia(filter: IFilter) {
    const params = new HttpParams()
      .set('year', filter.year);

    if (filter.month) {
      console.info('here');
      params.set('month', String(filter.month));
    }

    return this.http
      .get<IMedia>('/api/v1/photos', { params })
      .pipe(
        tap((data) => {
          this._orientations.next(this.getOrientation(data.media));
          this._images.next(data.media);
        }),
      );
  }

  /**
   * Fetches all folders from `/api/v1/folders`
   */
  fetchFolders() {
    return this.http.get('/api/v1/folders');
  }

  getOrientation(images: IFile[]): Record<string, string> {
    const imageOrientations: Record<string, string> = {};
    images.forEach(image => {
      imageOrientations[image.id] = image.Orientation ?? '0';
    });
    return imageOrientations;
  }

  setFilter(filter: [string, number]): void {
    console.info('here', filter);
    const [year, month] = filter;
    this.fetchMedia({ year, month }).subscribe();
    window.localStorage.setItem('filter', JSON.stringify({ year, month }));
  }
}

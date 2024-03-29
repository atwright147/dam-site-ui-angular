import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

import { IFile } from '../interfaces/files.interface';
import { emptyFormGroup } from '../utils/form';

export interface IMedia {
  quantity: number;
  media: IFile[];
}

export interface IMonths {
  year: string;
  monthName: string;
  monthIndex: number;
}

export interface IYear {
  year: string;
  months: IMonths[];
}

export interface IDates {
  quantity: number;
  dates: IYear[];
}

export interface IFilter {
  year: string;
  month: number | null;
}

@Injectable({
  providedIn: 'root'
})
export class MediaService implements OnDestroy {
  readonly form = this.fb.group({});
  private readonly subs: Subscription[] = [];

  private readonly _path = new BehaviorSubject<string>('');
  private readonly _images = new BehaviorSubject<IFile[]>([]);
  private readonly _orientations = new BehaviorSubject<Record<string, string>>({});
  private readonly _selected = new BehaviorSubject<IFile[]>([]);
  private readonly _previewSelection = new BehaviorSubject<IFile[]>([]);
  private readonly _dates = new BehaviorSubject<IYear[]>([]);

  /* eslint-disable @typescript-eslint/member-ordering */
  readonly images$: Observable<IFile[]> = this._images.asObservable();
  readonly orientations$: Observable<Record<string, string>> = this._orientations.asObservable();
  readonly selected$: Observable<IFile[]> = this._selected.asObservable();
  readonly previewSelection$: Observable<IFile[]> = this._previewSelection.asObservable();
  readonly dates$: Observable<IYear[]> = this._dates.asObservable();
  /* eslint-enable @typescript-eslint/member-ordering */

  constructor(
    private readonly http: HttpClient,
    private readonly fb: FormBuilder,
  ) {
    // fixes issue where form was rendering before initiated
    // see: https://github.com/KillerCodeMonkey/ngx-quill/issues/187#issuecomment-695796458
    this.form = this.fb.group({
      checkboxes: this.fb.group({}),
    });

    this.init();
  }

  init(): void {
    let images: IFile[] = [];
    const imageSub = this.images$.subscribe(
      (data) => {
        images = data;

        const checkboxes = this.form.get('checkboxes') as FormGroup;
        emptyFormGroup(checkboxes);

        images?.forEach((item: IFile) => {
          checkboxes.addControl(`${item.id}`, new FormControl(false));
        });
      },
    );

    const formChangesSub = this.form.valueChanges.subscribe(
      (val) => {
        const selection = [];
        const previewSelection = [];

        Object.keys(val.checkboxes).forEach((key: string) => {
          if (val.checkboxes[key]) {
            selection.push(images.filter(item => item.id.toString() === key)[0]);
            previewSelection.push(images.filter(item => item.id.toString() === key)[0]);
          }
        });

        this._selected.next(selection);
        this._previewSelection.next(previewSelection.splice(0, 6));
      },
    );

    this.subs.push(formChangesSub, imageSub);
  }

  ngOnDestroy(): void {
    this.subs.forEach((sub) => sub.unsubscribe());
  }

  get path$(): Observable<string> {
    if (!this._path.value) {
      const newPath = !localStorage.getItem('path') ? '/' : localStorage.getItem('path');
      this._path.next(newPath);
    }
    return this._path.asObservable();
  }

  setPath(path: string): void {
    localStorage.setItem('path', path);
    this._path.next(path);
  }

  /**
   * Fetches files and folders from `/api/v1/photos`
   * Use to initiate BehaviorSubjects
   */
  fetchDates(): Observable<IDates> {
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
  fetchMedia(filter: IFilter): Observable<IMedia> {
    let params = new HttpParams()
      .set('year', filter.year);

    if (typeof filter.month === 'number') {
      params = params.append('month', String(filter.month));
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

  getOrientation(images: IFile[] = []): Record<string, string> {
    const imageOrientations: Record<string, string> = {};
    images.forEach((image) => {
      imageOrientations[image.id] = image.Orientation ?? '0';
    });
    return imageOrientations;
  }

  setFilter(filter: [string, number]): void {
    const [year, month] = filter;
    this.fetchMedia({ year, month }).subscribe();
    window.localStorage.setItem('filter', JSON.stringify({ year, month }));
  }

  removeFromSelection(index: number): void {
    const idToRemove = this._selected.value[index].id;
    const checkboxes = this.form.get('checkboxes') as FormGroup;

    checkboxes.controls[idToRemove].setValue(false);
  }
}

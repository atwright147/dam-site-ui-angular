import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {
  private readonly _counter = new BehaviorSubject(0);

  constructor() { }

  get counter(): Observable<number> {
    return this._counter.asObservable();
  }

  add(): void {
    this._counter.next(this._counter.value + 1);
  }

  remove(): void {
    if (this._counter.value > 0) {
      this._counter.next(this._counter.value - 1);
    }
  }
}

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {
  private readonly _counter = new BehaviorSubject(0);

  /* eslint-disable @typescript-eslint/member-ordering */
  readonly counter$ = this._counter.asObservable();
  /* eslint-enable @typescript-eslint/member-ordering */

  add(): void {
    this._counter.next(this._counter.value + 1);
  }

  remove(): void {
    /* istanbul ignore else */
    if (this._counter.value > 0) {
      this._counter.next(this._counter.value - 1);
    }
  }
}

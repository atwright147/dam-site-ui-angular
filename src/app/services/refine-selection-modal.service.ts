import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RefineSelectionModalService {
  private readonly _showRefineSelectionModal = new BehaviorSubject(false);

  /* eslint-disable @typescript-eslint/member-ordering */
  readonly showRefineSelectionModal$ = this._showRefineSelectionModal.asObservable();
  /* eslint-enable @typescript-eslint/member-ordering */

  show(): void {
    this._showRefineSelectionModal.next(true);
  }

  hide(): void {
    this._showRefineSelectionModal.next(false);
  }
}

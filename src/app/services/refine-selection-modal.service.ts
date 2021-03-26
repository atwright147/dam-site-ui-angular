import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RefineSelectionModalService {
  _showRefineSelectionModal = new BehaviorSubject(false);
  showRefineSelectionModal$ = this._showRefineSelectionModal.asObservable();
  value = this._showRefineSelectionModal.value;

  show(): void {
    this._showRefineSelectionModal.next(true);
  }

  hide(): void {
    this._showRefineSelectionModal.next(false);
  }
}

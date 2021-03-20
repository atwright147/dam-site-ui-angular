import { Component, HostListener } from '@angular/core';
import { RefineSelectionModalService } from '../../services/refine-selection-modal.service';

@Component({
  selector: 'app-refine-selection',
  templateUrl: './refine-selection.component.html',
  styleUrls: ['./refine-selection.component.scss']
})
export class RefineSelectionComponent {

  constructor(
    private readonly refineSelectionModalService: RefineSelectionModalService,
  ) { }

  @HostListener('document:keyup', ['$event']) hideSelectionRefinementModal(event: KeyboardEvent) {
    if (event.key === 'Esc' || event.key === 'Escape') {
      this.refineSelectionModalService.hide();
    }
  }

  close() {
    this.refineSelectionModalService.hide();
  }
}

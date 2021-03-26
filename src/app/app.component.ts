import { Component, HostListener, OnInit } from '@angular/core';

import { IFilter, MediaService } from './services/media.service';
import { RefineSelectionModalService } from './services/refine-selection-modal.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  showRefineSelectionModal$ = this.refineSelectionModalService.showRefineSelectionModal$;

  constructor(
    private readonly mediaService: MediaService,
    private readonly refineSelectionModalService: RefineSelectionModalService,
  ) { }

  // using the `keydown` is bad for a11y but it is the only way to catch the `metaKey` property
  @HostListener('document:keydown', ['$event']) showSelectionRefinementModal(event: KeyboardEvent) {
    if ((event.ctrlKey || event.metaKey) && event.key === 'b') {
      event.preventDefault();
      let state: boolean;

      this.refineSelectionModalService.showRefineSelectionModal$.subscribe(
        (data) => state = data,
      );

      if (state) {
        this.refineSelectionModalService.hide();
      } else {
        this.refineSelectionModalService.show();
      }
    }
  }

  ngOnInit() {
    const filter = JSON.parse(window.localStorage.getItem('filter')) as IFilter;
    this.mediaService.fetchDates().subscribe();
    this.mediaService.fetchMedia(filter).subscribe();
  }
}

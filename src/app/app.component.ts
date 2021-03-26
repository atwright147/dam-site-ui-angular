import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { IFile } from './interfaces/files.interface';
import { IFilter, MediaService } from './services/media.service';
import { RefineSelectionModalService } from './services/refine-selection-modal.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnDestroy, OnInit {
  showRefineSelectionModal$ = this.refineSelectionModalService.showRefineSelectionModal$;
  selected: IFile[];
  subs: Subscription[];

  constructor(
    private readonly mediaService: MediaService,
    private readonly refineSelectionModalService: RefineSelectionModalService,
  ) { }

  // using the `keydown` is bad for a11y but it is the only way to catch the `metaKey` property
  @HostListener('document:keydown', ['$event']) showSelectionRefinementModal(event: KeyboardEvent): void {
    if ((event.ctrlKey || event.metaKey) && event.key === 'b') {
      if (!this.selected.length) {
        return;
      }

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

  ngOnDestroy(): void {
    this.subs.forEach((sub) => sub.unsubscribe());
  }

  ngOnInit(): void {
    const filter = JSON.parse(window.localStorage.getItem('filter')) as IFilter;
    this.mediaService.fetchDates().subscribe();
    this.mediaService.fetchMedia(filter).subscribe();
    const selectedSub = this.mediaService.selected$.subscribe(
      (data) => this.selected = data,
    );

    this.subs.push(selectedSub);
  }
}

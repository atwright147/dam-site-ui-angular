import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { Subscription } from 'rxjs';

import { IFile } from '../../../interfaces/files.interface';
import { MediaService } from '../../../services/media.service';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent implements OnInit, OnDestroy {
  images: IFile[] = [];
  readonly form = this.mediaService.form;
  readonly selected$ = this.mediaService.selected$;
  readonly previewSelection$ = this.mediaService.previewSelection$;
  readonly orientations$ = this.mediaService.orientations$;

  private readonly subs: Subscription[] = [];

  constructor(
    private readonly mediaService: MediaService,
  ) { }

  @HostListener('document:keyup', ['$event']) keyEvent(event: KeyboardEvent): void {
    const target = event.target as HTMLInputElement;
    if (target.type !== 'checkbox') {
      return;
    }

    const dataIndex = parseInt((event.target as HTMLElement).dataset.index, 10);

    /* eslint-disable no-console */
    switch (event.key) {
      case 'ArrowLeft':
        console.info('left');
        (document.querySelector(`input[type="checkbox"][data-index="${dataIndex - 1}"]`) as HTMLInputElement).focus();
        break;

      case 'ArrowRight':
        console.info('right');
        (document.querySelector(`input[type="checkbox"][data-index="${dataIndex + 1}"]`) as HTMLInputElement).focus();
        break;

      case 'ArrowUp':
        console.info('up');
        break;

      case 'ArrowDown':
        console.info('down');
        break;

      default:
        break;
    }
    /* eslint-enable no-console */
  }

  //#region KeyValuePipe sorting functions
  originalOrder = (): number => 0;

  valueAscOrder = (a, b): number => a.value.localeCompare(b.value);

  keyDescOrder = (a, b): number => a.key > b.key ? -1 : (b.key > a.key ? 1 : 0);
  //#endregion

  ngOnInit(): void {
    const imagesSub = this.mediaService.images$.subscribe(
      (data) => this.images = data,
    );

    this.subs.push(imagesSub);
  }

  ngOnDestroy(): void {
    this.subs.forEach((sub) => sub.unsubscribe());
  }
}

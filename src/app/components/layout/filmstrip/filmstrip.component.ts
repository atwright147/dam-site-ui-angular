import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { Subscription } from 'rxjs';

import { IFile } from '../../../interfaces/files.interface';
import { MediaService } from '../../../services/media.service';

@Component({
  selector: 'app-filmstrip',
  templateUrl: './filmstrip.component.html',
  styleUrls: ['./filmstrip.component.scss']
})
export class FilmstripComponent implements OnInit, OnDestroy {
  form = this.mediaService.form;
  subs: Subscription[] = [];
  selected$ = this.mediaService.selected$;
  previewSelection$ = this.mediaService.previewSelection$;
  orientations$ = this.mediaService.orientations$;
  images: IFile[] = [];

  constructor(
    private readonly mediaService: MediaService,
  ) { }

  @HostListener('document:keyup', ['$event']) keyEvent(event: KeyboardEvent) {
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

  ngOnInit() {
    const imagesSub = this.mediaService.images$.subscribe(
      (data) => this.images = data,
    );

    this.subs.push(imagesSub);
  }

  ngOnDestroy() {
    this.subs.forEach((sub) => sub.unsubscribe());
  }
}

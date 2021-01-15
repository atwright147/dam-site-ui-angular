import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';

import { IFile } from '../../../interfaces/files.interface';
import { MediaService } from '../../../services/media.service';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent implements OnInit, OnDestroy {
  form = this.fb.group({});
  formChangeSub: Subscription;
  selected$ = this.mediaService.selected$;
  previewSelection$ = this.mediaService.previewSelection$;
  images: IFile[] = [];

  constructor(
    private readonly fb: FormBuilder,
    private readonly mediaService: MediaService,
  ) { }

  ngOnInit() {
    this.mediaService.fetch()
      .subscribe(
        (data) => {
          this.images = data.media;

          const controls = {};
          for (const image of this.images) {
            controls[image.id] = [{ value: false, disabled: false }];
          }
          this.form = this.fb.group(controls);

          this.formChangeSub = this.form.valueChanges.subscribe((val) => {
            const selection = [];
            const previewSelection = [];
            Object.keys(val).forEach((key: string) => {
              if (val[key]) {
                selection.push(this.images.filter(item => item.id.toString() === key)[0]);
                previewSelection.push(this.images.filter(item => item.id.toString() === key)[0]);
              }
            });
            this.mediaService.selected = selection;
            this.mediaService.previewSelection = previewSelection.splice(0, 6);
          });
        },
        (err) => console.debug(err),
      );
  }

  ngOnDestroy() {
    this.formChangeSub.unsubscribe();
  }

  @HostListener('document:keyup', ['$event']) moveFocus(event: KeyboardEvent) {
    const target = event.target as HTMLInputElement;
    if (target.type !== 'checkbox') {
      return;
    }

    const dataIndex = parseInt((event.target as HTMLElement).dataset.index, 10);

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
  }

  getControls(group: FormGroup) {
    if (group instanceof FormArray) {
      return group.controls;
    }

    try {
      return Object.keys(group.controls);
    } catch (err) {
      console.debug(err);
    }
  }
}

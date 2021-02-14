import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
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
  subs: Subscription[] = [];
  formChangeSub: Subscription;
  selected$ = this.mediaService.selected$;
  previewSelection$ = this.mediaService.previewSelection$;
  images: IFile[] = [];

  constructor(
    private readonly fb: FormBuilder,
    private readonly mediaService: MediaService,
  ) { }

  ngOnInit() {
    const imagesSub = this.mediaService.images$.subscribe(
      (data) => {
        this.images = data;

        this.form = this.fb.group({
          checkboxes: this.fb.group({}),
        });

        const checkboxes = this.form.get('checkboxes') as FormGroup;
        this.images?.forEach((item: IFile) => {
          checkboxes.addControl(`${item.id}`, new FormControl(false));
        });

        const formChangesSub = this.form.valueChanges.subscribe(
          (val) => {
            const selection = [];
            const previewSelection = [];

            Object.keys(val.checkboxes).forEach((key: string) => {
              if (val.checkboxes[key]) {
                selection.push(this.images.filter(item => item.id.toString() === key)[0]);
                previewSelection.push(this.images.filter(item => item.id.toString() === key)[0]);
              }
            });

            this.mediaService.selected = selection;
            this.mediaService.previewSelection = previewSelection.splice(0, 6);
          },
          console.debug,
        );
        this.subs.push(formChangesSub);
      },
      console.debug,
    );

    this.subs.push(imagesSub);
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

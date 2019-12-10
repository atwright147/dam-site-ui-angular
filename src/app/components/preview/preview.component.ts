import { Component, OnInit } from '@angular/core';

import { ImagesService } from '../../services/images/images.service';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss']
})
export class PreviewComponent implements OnInit {
  previewSelection$ = this.imagesService.previewSelection$;

  constructor(
    private readonly imagesService: ImagesService,
  ) { }

  ngOnInit() {}

  get numSelected() {
    let selected;
    this.previewSelection$.subscribe(
      (data) => selected = data,
    );
    return selected.length;
  }
}

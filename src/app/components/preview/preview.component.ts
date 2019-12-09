import { Component, OnInit } from '@angular/core';

import { ImagesService } from '../../services/images/images.service';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss']
})
export class PreviewComponent implements OnInit {
  selected$ = this.imagesService.selected$;

  constructor(
    private readonly imagesService: ImagesService,
  ) { }

  ngOnInit() {}

  get numSelected() {
    let selected = [];
    this.selected$.subscribe(
      (data) => selected = data,
    );
    const len = selected.length;
    return len > 6 ? 6 : len;
  }
}
import { Component, OnInit } from '@angular/core';

import { MediaService } from '../../services/media.service';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss']
})
export class PreviewComponent {
  previewSelection$ = this.mediaService.previewSelection$;

  constructor(
    private readonly mediaService: MediaService,
  ) { }
}

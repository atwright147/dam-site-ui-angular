import { Component } from '@angular/core';

import { MediaService } from '../../services/media.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  selected$ = this.mediaService.selected$;

  constructor(
    private readonly mediaService: MediaService,
  ) { }
}

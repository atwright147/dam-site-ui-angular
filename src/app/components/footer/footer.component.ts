import { Component, OnInit } from '@angular/core';

import { MediaService } from '../../services/media.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  selected$ = this.mediaService.selected$;

  constructor(
    private readonly mediaService: MediaService,
  ) { }

  ngOnInit() { }

  get selectionLength() {
    let selected;
    this.selected$.subscribe(
      (data) => {
        selected = data;
        // console.info(data);
      },
    );
    return selected.length;
  }

}

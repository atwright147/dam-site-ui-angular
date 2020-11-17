import { Component, OnInit } from '@angular/core';

import { MediaService } from './services/media.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    private readonly mediaService: MediaService,
  ) { }

  ngOnInit() {
    this.mediaService.path$.subscribe(
      () => {
        this.mediaService.fetch().subscribe();
      },
    );
  }

  onEvent(event) {
    this.mediaService.setPath(encodeURI(event.node.data.path));
  }
}

import { Component, OnInit } from '@angular/core';

import { IFilter, MediaService } from './services/media.service';

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
    const filter = JSON.parse(window.localStorage.getItem('filter')) as IFilter;
    this.mediaService.fetchDates().subscribe();
    this.mediaService.fetchMedia(filter).subscribe();
  }
}

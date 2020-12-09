import { Component, OnInit } from '@angular/core';

import { MediaService } from '../../services/media.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  dates: string[];

  constructor(
    private readonly mediaService: MediaService,
  ) { }

  ngOnInit(): void {
    this.mediaService.dates$.subscribe(
      (data) => this.dates = data,
    );
  }

  setFilter(...args) {
    console.info(args);
  }
}

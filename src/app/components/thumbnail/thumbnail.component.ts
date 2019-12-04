import { Component, OnInit, Input } from '@angular/core';
import { ControlContainer, NgForm } from '@angular/forms';

@Component({
  selector: 'app-thumbnail',
  templateUrl: './thumbnail.component.html',
  styleUrls: ['./thumbnail.component.scss'],
  viewProviders: [ { provide: ControlContainer, useExisting: NgForm } ]
})
export class ThumbnailComponent implements OnInit {
  @Input() imageUrl: string;
  @Input() imageId: string;
  @Input() index: number;

  constructor() { }

  ngOnInit() {
  }

}

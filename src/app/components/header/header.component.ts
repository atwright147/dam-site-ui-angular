import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { MediaService } from '../../services/media.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  form: FormGroup;

  constructor(
    private readonly fb: FormBuilder,
    private readonly mediaService: MediaService,
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      path: this.mediaService.path,
    });
  }

  onSubmit() {
    console.info(this.form.value);
    this.mediaService.path = this.form.get('path').value;
  }
}

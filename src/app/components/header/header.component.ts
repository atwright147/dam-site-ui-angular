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
    this.mediaService.path$.subscribe(data => {
      console.info(data);
      this.form = this.fb.group({
        path: data,
      });
    });
  }

  onSubmit() {
    console.info(this.form.value);
    this.mediaService.setPath(this.form.get('path').value);
  }
}

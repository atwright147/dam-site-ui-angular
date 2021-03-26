import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { MediaService } from '../../services/media.service';
import { RefineSelectionModalService } from '../../services/refine-selection-modal.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  form: FormGroup;
  selected$ = this.mediaService.selected$;

  constructor(
    private readonly fb: FormBuilder,
    private readonly mediaService: MediaService,
    private readonly refineSelectionModalService: RefineSelectionModalService,
  ) { }

  ngOnInit(): void {
    this.mediaService.path$.subscribe(data => {
      this.form = this.fb.group({
        path: data,
      });
    });
  }

  onSubmit(): void {
    this.mediaService.setPath(this.form.get('path').value);
  }

  showRefineSelectionUI(): void {
    this.refineSelectionModalService.show();
  }
}

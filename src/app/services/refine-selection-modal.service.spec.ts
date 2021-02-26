import { TestBed } from '@angular/core/testing';

import { RefineSelectionModalService } from './refine-selection-modal.service';

describe('RefineSelectionModalService', () => {
  let service: RefineSelectionModalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RefineSelectionModalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

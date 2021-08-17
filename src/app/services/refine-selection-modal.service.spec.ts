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

  describe('show()', () => {
    it('should show the modal', () => {
      service.hide();
      service.show();
      service.showRefineSelectionModal$.subscribe((value) => expect(value).toEqual(true));
    });
  });

  describe('hide()', () => {
    it('should hide the modal', () => {
      service.show();
      service.hide();
      service.showRefineSelectionModal$.subscribe((value) => expect(value).toEqual(false));
    });
  });
});

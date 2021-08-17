import { TestBed } from '@angular/core/testing';

import { SpinnerService } from './spinner.service';

describe('SpinnerService', () => {
  let service: SpinnerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpinnerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('add()', () => {
    it('should add 1', () => {
      service.add();
      service.counter$.subscribe((value) => expect(value).toEqual(1));
    });
  });

  describe('remove()', () => {
    it('should remove 1', () => {
      service.add();
      service.add();
      service.remove();
      service.counter$.subscribe((value) => expect(value).toEqual(1));
    });
  });
});

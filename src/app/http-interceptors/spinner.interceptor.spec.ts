import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { Observable, throwError } from 'rxjs';

import { SpinnerInterceptor } from './spinner.interceptor';
import { SpinnerService } from '../services/spinner.service';
import { MediaService } from '../services/media.service';
import { FormBuilder } from '@angular/forms';

describe('SpinnerInterceptor', () => {
  let mediaService: MediaService;
  let spinnerService: SpinnerService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      providers: [
        FormBuilder,
        MediaService,
        SpinnerService,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: SpinnerInterceptor,
          multi: true,
        }
      ],
    });

    mediaService = TestBed.inject(MediaService);
    spinnerService = TestBed.inject(SpinnerService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  describe('given a request is initiated', () => {
    it('should add one spinner', () => {
      const spinnerServiceAddSpy = spyOn(spinnerService, 'add');

      mediaService.fetchDates().subscribe();
      httpMock.expectOne('/api/v1/dates');

      expect(spinnerServiceAddSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('given a successful response', () => {
    it('should remove one spinner', () => {
      const spinnerServiceRemoveSpy = spyOn(spinnerService, 'remove');

      mediaService.fetchDates().subscribe();
      const req = httpMock.expectOne('/api/v1/dates');
      req.flush(200);

      expect(spinnerServiceRemoveSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('given an error response', () => {
    it('should remove one spinner', () => {
      const spinnerServiceRemoveSpy = spyOn(spinnerService, 'remove');

      mediaService.fetchDates().subscribe();
      const req = httpMock.expectOne('/api/v1/dates');
      req.flush(404);

      expect(spinnerServiceRemoveSpy).toHaveBeenCalledTimes(1);
    });

    it('should re-throw the error', () => {
      const mockError = { message: 'Mock error', status: 500 };
      const mockHandler = { handle: (): Observable<never> => throwError(mockError) };

      const interceptor = new SpinnerInterceptor(spinnerService);

      interceptor.intercept(new HttpRequest('GET', ''), mockHandler).subscribe(
        () => fail('should have been a success'),
        (data) => expect(data).toEqual(mockError),
      );
    });
  });
});

import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IDates, MediaService } from './media.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpRequest } from '@angular/common/http';

// #region Mock Data
const mockDatesResponse: IDates = {
  quantity: 2,
  dates: [
      {
          year: '2001',
          months: [
              {
                  year: '2001',
                  monthName: 'February',
                  monthIndex: 1
              },
              {
                  year: '2001',
                  monthName: 'May',
                  monthIndex: 4
              }
          ]
      },
      {
          year: '2002',
          months: [
              {
                  year: '2000',
                  monthName: 'July',
                  monthIndex: 6
              },
              {
                  year: '2001',
                  monthName: 'August',
                  monthIndex: 7
              }
          ]
      }
  ]
};

/* eslint-disable @typescript-eslint/naming-convention */
const mockPhotosResponse = {
  quantity: 2,
  media: [
      {
          id: 1,
          ImageUniqueID: '0c560ff6ccb6467c86380671ba49ae15',
          FileName: '20120117-e01.CR2',
          ImageHeight: '3456',
          ImageWidth: '5184',
          Orientation: '1',
          FileSize: '24 MiB',
          FileType: 'CR2',
          FileTypeExtension: 'cr2',
          MIMEType: 'image/x-canon-cr2',
          MajorBrand: null,
          Make: 'Canon',
          Model: 'Canon EOS Kiss X4',
          ExposureTime: '1/200',
          FNumber: '5.6',
          ISO: '100',
          FocalLength: '28.0 mm',
          SerialNumber: '2213309621',
          Rating: null,
          MegaPixels: null,
          DateTimeOriginal: '2012-02-17T11:26:39.000Z',
          created_at: '2021-01-17T00:38:46.658Z',
          updated_at: '2021-01-17T00:38:46.660Z'
      },
      {
          id: 2,
          ImageUniqueID: 'caf50becbb494208bc4017f43e1cdc58',
          FileName: 'RAW_CANON_EOS_1DX.CR2',
          ImageHeight: '3456',
          ImageWidth: '5184',
          Orientation: '1',
          FileSize: '25 MiB',
          FileType: 'CR2',
          FileTypeExtension: 'cr2',
          MIMEType: 'image/x-canon-cr2',
          MajorBrand: null,
          Make: 'Canon',
          Model: 'Canon EOS-1D X',
          ExposureTime: '1/80',
          FNumber: '5.6',
          ISO: '1600',
          FocalLength: '70.0 mm',
          SerialNumber: '062011000450',
          Rating: '0',
          MegaPixels: null,
          DateTimeOriginal: '2012-10-06T07:48:25.000Z',
          created_at: '2021-01-17T00:39:06.060Z',
          updated_at: '2021-01-17T00:39:06.062Z'
      }
  ]
};
/* eslint-enable @typescript-eslint/naming-convention */
// #endregion

describe('MediaService', () => {
  let service: MediaService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [ FormBuilder ],
    });

    service = TestBed.inject(MediaService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('constructor()', () => {
    it('should create a FormGroup', () => {
      const mediaService = new MediaService({} as any, new FormBuilder());

      expect(mediaService.form).toBeInstanceOf(FormGroup);
      expect(mediaService.form.controls.checkboxes).toBeInstanceOf(FormGroup);
    });

    it('should call init()', () => {
      // https://stackoverflow.com/a/63825465/633056
      const initSpy = spyOn(MediaService.prototype, 'init').and.stub();
      new MediaService({} as any, new FormBuilder());

      expect(initSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('ngOnDestroy()', () => {
    it('should unsubscribe', () => {
      const unsubscribeSpy = jasmine.createSpy('unsubscribe');
      const mockSubscription1 = { unsubscribe: unsubscribeSpy };
      const mockSubscription2 = { unsubscribe: unsubscribeSpy };

      // @ts-ignore (because `subs` is readonly)
      service['subs'] = [mockSubscription1, mockSubscription2];  // eslint-disable-line @typescript-eslint/dot-notation

      service.ngOnDestroy();

      expect(unsubscribeSpy).toHaveBeenCalledTimes(2);
    });
  });

  describe('get path$()', () => {
    const mockPath = '/set/path/test';

    describe('given path observable has a non-zero length value', () => {
      beforeEach(() => {
        service.setPath(mockPath);
      });

      it('should not access localStorage', () => {
        const localStorageSetItemSpy = spyOn(localStorage, 'getItem');

        expect(localStorageSetItemSpy).toHaveBeenCalledTimes(0);
      });

      it('should return value of observable', () => {
        service.path$.subscribe(
          (value) => expect(value).toBe(mockPath),
        );
      });
    });

    describe('given path observable has value of zero length', () => {
      describe('given there is no path saved in localStorage', () => {
        it('should return "/"', () => {
          spyOn(localStorage, 'getItem').and.returnValue('');

          service.path$.subscribe(
            (value) => expect(value).toBe('/'),
          );
        });
      });

      describe('given there is no path saved in localStorage', () => {
        it('should return the path from localStorage', () => {
          spyOn(localStorage, 'getItem').and.returnValue('/mock/path');

          service.path$.subscribe(
            (value) => expect(value).toBe('/mock/path'),
          );
        });

        it('should next() the path observable', () => {
          const pathNextSpy = spyOn(service['_path'], 'next');  // eslint-disable-line @typescript-eslint/dot-notation
          spyOn(localStorage, 'getItem').and.returnValue('/mock/path');

          service.path$.subscribe(
            () => expect(pathNextSpy).toHaveBeenCalledWith('/mock/path'),
          );
        });
      });
    });
  });

  describe('setPath()', () => {
    const mockPath = '/set/path/test';

    it('should set path in localStorage', () => {
      const localStorageSetItemSpy = spyOn(localStorage, 'setItem');

      service.setPath(mockPath);

      expect(localStorageSetItemSpy).toHaveBeenCalledWith('path', mockPath);
    });

    it('should next() the path observable', () => {
      const pathNextSpy = spyOn(service['_path'], 'next');  // eslint-disable-line @typescript-eslint/dot-notation

      service.setPath(mockPath);

      expect(pathNextSpy).toHaveBeenCalledWith(mockPath);
    });
  });

  describe('fetchDates()', () => {
    it('should call http.get with correct args', () => {
      const expectedUrl = '/api/v1/dates';

      service.fetchDates().subscribe();

      const result = httpTestingController.expectOne(
        (req: HttpRequest<any>) => req.url.includes(expectedUrl)
      );

      expect(result.request.url).toEqual(expectedUrl);
    });

    it('should next() dates observable', () => {
      // eslint-disable-next-line @typescript-eslint/dot-notation
      const datesObservableSpy = spyOn(service['_dates'], 'next');

      service.fetchDates()
        .subscribe(() => {
          expect(datesObservableSpy).toHaveBeenCalledTimes(1);
          expect(datesObservableSpy).toHaveBeenCalledWith(mockDatesResponse.dates);
        });

      const req = httpTestingController.expectOne('/api/v1/dates');

      req.flush(mockDatesResponse);
    });
  });

  describe('fetchMedia()', () => {
    describe('time filter', () => {
      describe('given a month filter is NOT provided', () => {
        it('should call http.get with correct args', () => {
          const expectedUrl = '/api/v1/photos?year=2001';

          service.fetchMedia({ year: '2001', month: null }).subscribe();

          const result = httpTestingController.expectOne(
            (req: HttpRequest<any>) => req.urlWithParams.includes(expectedUrl)
          );

          expect(result.request.urlWithParams).toEqual(expectedUrl);
        });
      });

      describe('given a month filter IS provided', () => {
        it('should call http.get with correct args', () => {
          const expectedUrl = '/api/v1/photos?year=2001&month=2';

          service.fetchMedia({ year: '2001', month: 2 }).subscribe();

          const result = httpTestingController.expectOne(
            (req: HttpRequest<any>) => req.urlWithParams.includes(expectedUrl)
          );

          expect(result.request.urlWithParams).toEqual(expectedUrl);
        });
      });
    });

    it('should call next() orientations observable', () => {
      // eslint-disable-next-line @typescript-eslint/dot-notation
      const orientationsObservableSpy = spyOn(service['_orientations'], 'next');

      const mockOrientations = { 1: '1', 2: '1' };
      spyOn(service, 'getOrientation').and.returnValue(mockOrientations);

      service.fetchMedia({ year: '2001', month: 0 })
        .subscribe(() => {
          expect(orientationsObservableSpy).toHaveBeenCalledTimes(1);
          expect(orientationsObservableSpy).toHaveBeenCalledWith(mockOrientations);
        });

      const req = httpTestingController.expectOne('/api/v1/photos?year=2001&month=0');

      req.flush(mockDatesResponse);
    });

    it('should call next() images observable', () => {
      // eslint-disable-next-line @typescript-eslint/dot-notation
      const imagesObservableSpy = spyOn(service['_images'], 'next');

      service.fetchMedia({ year: '2001', month: 0 })
        .subscribe(() => {
          expect(imagesObservableSpy).toHaveBeenCalledTimes(1);
          expect(imagesObservableSpy).toHaveBeenCalledWith(mockPhotosResponse.media);
        });

      const req = httpTestingController.expectOne('/api/v1/photos?year=2001&month=0');

      req.flush(mockPhotosResponse);
    });
  });
});

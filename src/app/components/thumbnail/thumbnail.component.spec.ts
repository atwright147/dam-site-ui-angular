import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';

import { ThumbnailComponent } from './thumbnail.component';
import { TrueOrNullPipe } from '../../pipes/true-or-null/true-or-null.pipe';

describe('ThumbnailComponent', () => {
  let component: ThumbnailComponent;
  let fixture: ComponentFixture<ThumbnailComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        ThumbnailComponent,
        TrueOrNullPipe,
      ],
      providers: [
        FormBuilder,
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThumbnailComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('template', () => {
    describe('input element', () => {
      it('should have correct attributes', () => {
        const nativeElement: HTMLDivElement = fixture.nativeElement;
        const element = nativeElement.querySelector('input');

        component.disabled = false;
        component.imageId = 'testId';
        component.imageUrl = '/test/url';
        component.index = 5;
        component.value = true;

        fixture.detectChanges();

        expect(element.id).toBe(`image-${component.imageId}`);
        expect(element.name).toBe(`image-${component.imageId}`);
        expect(element.dataset.index).toBe(component.index.toString());
        expect(element.checked).toBe(component.value);
        expect(element.disabled).toBe(component.disabled);
        expect(element.value).toBe(component.value.toString());
      });

      it('should be disable-able', () => {
        const nativeElement: HTMLDivElement = fixture.nativeElement;
        const element = nativeElement.querySelector('input');

        component.disabled = true;

        fixture.detectChanges();

        expect(element.disabled).toBe(component.disabled);
      });
    });

    describe('label', () => {
      it('should have correct attributes', () => {
        const nativeElement: HTMLDivElement = fixture.nativeElement;
        const element = nativeElement.querySelector('label');

        component.disabled = false;
        component.imageId = 'testId';

        fixture.detectChanges();

        expect(element.htmlFor).toBe(`image-${component.imageId}`);
        expect(element.classList.contains('disabled')).toBe(component.disabled);
      });

      it('should be disable-able', () => {
        const nativeElement: HTMLDivElement = fixture.nativeElement;
        const element = nativeElement.querySelector('label');

        component.disabled = true;

        fixture.detectChanges();

        expect(element.classList.contains('disabled')).toBe(component.disabled);
      });

      it('should contain a figure element', () => {
        const nativeElement: HTMLDivElement = fixture.nativeElement;
        const element = nativeElement.querySelector('label');

        expect(element.querySelectorAll('figure')).toHaveSize(1);
      });

      it('should contain a figcaption element', () => {
        const nativeElement: HTMLDivElement = fixture.nativeElement;
        const element = nativeElement.querySelector('label');

        expect(element.querySelectorAll('figcaption')).toHaveSize(1);
      });
    });

    describe('figure', () => {
      it('should contain a div.thumb element', () => {
        const nativeElement: HTMLDivElement = fixture.nativeElement;
        const element = nativeElement.querySelector('figure');

        expect(element.querySelectorAll('div')).toHaveSize(1);
        expect(element.querySelectorAll('div.thumb')).toHaveSize(1);
      });
    });

    describe('div.thumb', () => {
      it('should have correct attributes', () => {
        const nativeElement: HTMLDivElement = fixture.nativeElement;
        const element: HTMLDivElement = nativeElement.querySelector('div.thumb');

        const ORIENTATION = '3';  // because `orientation` is a setter, not getter or field (prop)
        component.imageUrl = '/test/url';
        component.orientation = ORIENTATION;

        fixture.detectChanges();

        expect(element).toHaveClass('thumb');
        expect(element).toHaveClass(`exif-orientation-${ORIENTATION}`);
        expect(element.style.backgroundImage).toBe(`url("${component.imageUrl}")`);
      });
    });

    describe('figcaption', () => {
      it('should have correct content', () => {
        const nativeElement: HTMLDivElement = fixture.nativeElement;
        const element = nativeElement.querySelector('figcaption');

        component.imageId = '123';

        fixture.detectChanges();

        expect(element.textContent.trim()).toBe(component.imageId);
      });
    });
  });
});

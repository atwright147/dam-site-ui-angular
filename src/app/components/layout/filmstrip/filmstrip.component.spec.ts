import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';

import { FilmstripComponent } from './filmstrip.component';

describe('FilmstripComponent', () => {
  let component: FilmstripComponent;
  let fixture: ComponentFixture<FilmstripComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FilmstripComponent ],
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule,
      ],
      providers: [
        FormBuilder,
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilmstripComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

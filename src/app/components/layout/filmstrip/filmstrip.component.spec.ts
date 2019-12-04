import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilmstripComponent } from './filmstrip.component';

describe('FilmstripComponent', () => {
  let component: FilmstripComponent;
  let fixture: ComponentFixture<FilmstripComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilmstripComponent ]
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

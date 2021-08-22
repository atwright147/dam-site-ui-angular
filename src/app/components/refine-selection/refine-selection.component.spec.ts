import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

import { RefineSelectionComponent } from './refine-selection.component';
import { CarouselComponent } from '../carousel/carousel.component';

xdescribe('RefineSelectionComponent', () => {
  let component: RefineSelectionComponent;
  let fixture: ComponentFixture<RefineSelectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        RefineSelectionComponent,
        CarouselComponent,
      ],
      imports: [
        HttpClientModule,
      ],
      providers: [
        FormBuilder,
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RefineSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

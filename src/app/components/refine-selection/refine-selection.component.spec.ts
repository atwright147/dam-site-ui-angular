import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RefineSelectionComponent } from './refine-selection.component';

describe('RefineSelectionComponent', () => {
  let component: RefineSelectionComponent;
  let fixture: ComponentFixture<RefineSelectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RefineSelectionComponent ]
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

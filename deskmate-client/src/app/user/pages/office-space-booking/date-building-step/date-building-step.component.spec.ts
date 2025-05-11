import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DateBuildingStepComponent} from './date-building-step.component';


describe('DateBuildingPickerComponent', () => {
  let component: DateBuildingStepComponent;
  let fixture: ComponentFixture<DateBuildingStepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DateBuildingStepComponent]
    })
                 .compileComponents();

    fixture = TestBed.createComponent(DateBuildingStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

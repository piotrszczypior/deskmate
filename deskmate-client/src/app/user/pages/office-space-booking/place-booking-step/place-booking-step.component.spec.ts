import {ComponentFixture, TestBed} from '@angular/core/testing';

import {PlaceBookingStepComponent} from './place-booking-step.component';


describe('PlacePickerComponent', () => {
  let component: PlaceBookingStepComponent;
  let fixture: ComponentFixture<PlaceBookingStepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlaceBookingStepComponent]
    })
                 .compileComponents();

    fixture = TestBed.createComponent(PlaceBookingStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

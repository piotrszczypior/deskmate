import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfficeSpaceBookingComponent } from './office-space-booking.component';

describe('OfficeSpaceBookingComponent', () => {
  let component: OfficeSpaceBookingComponent;
  let fixture: ComponentFixture<OfficeSpaceBookingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OfficeSpaceBookingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OfficeSpaceBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

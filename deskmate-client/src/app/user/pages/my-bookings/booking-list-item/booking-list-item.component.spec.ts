import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingListItemComponent } from './booking-list-item.component';

describe('BookingListItemComponent', () => {
  let component: BookingListItemComponent;
  let fixture: ComponentFixture<BookingListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookingListItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookingListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

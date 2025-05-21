import {Component, OnInit} from '@angular/core';
import {BookingListItemComponent} from './booking-list-item/booking-list-item.component';
import {CanvasPoint, ImageCanvasComponent} from '../../../admin/components/image-canvas/image-canvas.component';
import {BookingsService} from './service/bookings.service';
import {Booking} from './model/BookingTypes';
import {OfficeSpaceService} from '../office-space-booking/service/office-space.service';
import {Desk, FloorImage} from '../office-space-booking/model/OfficeSpaceBookingTypes';
import {
  CreatorNavigationButtonsGruopComponent
} from '../../../admin/components/creator-navigation-buttons-gruop/creator-navigation-buttons-gruop.component';
import {Router} from '@angular/router';


@Component({
  selector: 'app-my-bookings',
  imports: [
    BookingListItemComponent,
    ImageCanvasComponent,
    CreatorNavigationButtonsGruopComponent
  ],
  templateUrl: './my-bookings.component.html',
  styleUrl: './my-bookings.component.scss'
})
export class MyBookingsComponent implements OnInit {
  protected bookings: Booking[] = [];
  protected selectedBookingFloorImage: FloorImage | undefined;
  protected selectedBookingCanvasPoints: CanvasPoint[];
  protected selectedBooking: Booking;
  private selectedBookingDesk: Desk | undefined;

  constructor(
      private readonly bookingsService: BookingsService,
      private readonly officeSpaceService: OfficeSpaceService,
      private readonly router: Router,
  ) {
  }

  ngOnInit(): void {
    this.bookingsService.getUserBookings().subscribe({next: value => this.bookings = value});
  }

  onBookingClick(booking: Booking): void {
    this.selectedBooking = booking;
    this.officeSpaceService.getFloorImagesByBuilding(booking.building.id)
        .subscribe({next: value => this.selectedBookingFloorImage = value.find(fi => fi.id === booking.floorImageId)});
    this.officeSpaceService.getDesksByFloorAndDate(booking.floorImageId, booking.startDate, booking.endDate)
        .subscribe({
          next: value => {
            this.selectedBookingDesk = value.find(d => d.id === booking.deskId);
            this.selectedBookingCanvasPoints = this.mapDesksToCanvasPoints(value)
          }
        });
  }

  navigateToEdit(): void {
    void this.router.navigate(['edit-booking', this.selectedBooking.id]);
  }

  private mapDesksToCanvasPoints(desks: Desk[]): CanvasPoint[] {
    let canvasPoints: CanvasPoint[] = [];
    desks.forEach(desk => {
      if (desk === this.selectedBookingDesk) {
        canvasPoints.push({point: desk.point, color: 'yellow'});
        return;
      }
      switch (desk.isAvailable) {
        case true:
          canvasPoints.push({point: desk.point, color: 'green'});
          break;
        case false:
          canvasPoints.push({point: desk.point, color: 'red'});
          break;
      }
    });
    return canvasPoints;
  }
}

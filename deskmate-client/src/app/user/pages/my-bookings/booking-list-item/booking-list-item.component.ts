import {Component, Input} from '@angular/core';
import {Booking} from '../model/BookingTypes';
import {getDateFromDate, getTimeFromDate} from '../../../../shared/utils/DateUtils';


@Component({
  selector: 'app-booking-list-item',
  imports: [],
  templateUrl: './booking-list-item.component.html',
  styleUrl: './booking-list-item.component.scss'
})
export class BookingListItemComponent {
  @Input({required: true})
  booking: Booking;

  protected readonly getDateFromDate = getDateFromDate;
  protected readonly getTimeFromDate = getTimeFromDate;
}

import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {Booking} from '../model/BookingTypes';
import {mockBookings} from '../../../../../assets/test-data/TestData';


@Injectable({
  providedIn: 'root'
})
export class BookingsService {

  constructor(private http: HttpClient) {
  }

  //TODO: API
  getUserBookings(): Observable<Booking[]> {
    return of(mockBookings)
  }

  //TODO: API
  getBookingById(id: number): Observable<Booking> {
    return of(mockBookings.find(b => b.id === id)!);
  }
}

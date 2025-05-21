import {Building} from '../../office-space-booking/model/OfficeSpaceBookingTypes';


export interface Booking {
  id: number;
  floorImageId: number;
  floorNumber: number;
  deskId: number;
  building: Building;
  startDate: Date;
  endDate: Date;
}

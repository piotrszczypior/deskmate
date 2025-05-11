import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {mockBuildings, mockFloorDesks, mockFloorImages} from '../../../../../assets/test-data/TestData';
import {Building, Desk, FloorImage} from '../model/OfficeSpaceBookingTypes';


@Injectable({
  providedIn: 'root'
})
export class OfficeSpaceService {

  constructor(private readonly http: HttpClient) {
  }

  //TODO: API call
  getAvailableBuildings(): Observable<Building[]> {
    return of(mockBuildings);
  }

  //TODO: API call
  getFloorImagesByBuilding(buildingId: number): Observable<FloorImage[]> {
    return of(mockFloorImages);
  }

  //TODO: API call
  getDesksByFloorAndDate(floorId: number, startDate: Date, endDate: Date): Observable<Desk[]> {
    return of(mockFloorDesks);
  }
}

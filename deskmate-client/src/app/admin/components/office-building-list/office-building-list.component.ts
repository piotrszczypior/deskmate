import {Component, EventEmitter, Input, Output} from '@angular/core';
import {OfficeBuildingItemComponent} from './office-building-item/office-building-item.component';
import {Building} from '../../../user/pages/office-space-booking/model/OfficeSpaceBookingTypes';


@Component({
  selector: 'app-office-building-list',
  imports: [OfficeBuildingItemComponent],
  templateUrl: './office-building-list.component.html',
  styleUrl: './office-building-list.component.scss',
})
export class OfficeBuildingListComponent {
  @Input()
  buildings: Building[] = [];

  @Output()
  onBuildingSelect = new EventEmitter<Building>();

  buildingSelected(building: Building): void {
    this.onBuildingSelect.emit(building);
  }
}

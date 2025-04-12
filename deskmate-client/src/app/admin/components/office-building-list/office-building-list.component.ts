import { Component, Input } from '@angular/core';
import { OfficeBuildingItemComponent } from './office-building-item/office-building-item.component';

@Component({
  selector: 'app-office-building-list',
  imports: [OfficeBuildingItemComponent],
  templateUrl: './office-building-list.component.html',
  styleUrl: './office-building-list.component.scss',
})
export class OfficeBuildingListComponent {
  @Input()
  buildings: any[] = [];
}

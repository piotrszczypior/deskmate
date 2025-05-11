import {Component, Input} from '@angular/core';
import {Router} from '@angular/router';


@Component({
  selector: 'app-office-building-item',
  imports: [],
  templateUrl: './office-building-item.component.html',
  styleUrl: './office-building-item.component.scss',
})
export class OfficeBuildingItemComponent {
  @Input()
  building: any;

  @Input() //TODO: to be removed
  index: number;

  constructor(private readonly router: Router) {
  }

  onClick(): void {
    // TODO
    //void this.router.navigate(['/admin-dashboard']);
  }
}

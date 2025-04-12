import { Component } from '@angular/core';
import { IconComponent } from '../../../shared/components/icon/icon.component';
import { BehaviorSubject, Observable } from 'rxjs';
import { AsyncPipe, NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { OfficeBuildingListComponent } from '../../components/office-building-list/office-building-list.component';
import { ProfileCardComponent } from '../../components/profile-card/profile-card.component';

@Component({
  selector: 'app-admin-dashboard',
  imports: [IconComponent, OfficeBuildingListComponent, AsyncPipe, NgIf, ProfileCardComponent],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss',
})
export class AdminDashboardComponent {
  constructor(private readonly router: Router) {}

  private _buildings$ = new BehaviorSubject([{}, {}]);

  get buildings$(): Observable<any[]> {
    return this._buildings$.asObservable();
  }

  navigateToOfficeCreator(event: Event): void {
    event.stopPropagation();
    event.preventDefault();
    void this.router.navigate(['office-creator']);
  }
}

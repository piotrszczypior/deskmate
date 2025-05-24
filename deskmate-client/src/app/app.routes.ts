import {Routes} from '@angular/router';
import {AdminDashboardComponent} from './admin/pages/admin-dashboard/admin-dashboard.component';
import {OfficeLayoutCreatorComponent} from './admin/pages/office-layout-creator/office-layout-creator.component';
import {LoginPageComponent} from './core/auth/login-page/login-page.component';
import {DemoComponent} from './demo/demo.component';
import {OfficeSpaceBookingComponent} from './user/pages/office-space-booking/office-space-booking.component';
import {MyBookingsComponent} from './user/pages/my-bookings/my-bookings.component';
import {USER_ROLES} from './core/auth/model/AuthTypes';
import {roleGuard} from './core/auth/role-guard';


export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    canActivate: [roleGuard],
    children: []
  },
  {
    path: 'login',
    component: LoginPageComponent,
    canActivate: [roleGuard],
    data: {expectedRole: USER_ROLES.publicUser}
  },
  {
    path: 'admin-dashboard',
    component: AdminDashboardComponent,
    canActivate: [roleGuard],
    data: {expectedRole: USER_ROLES.administrator}
  },
  {
    path: 'office-creator',
    component: OfficeLayoutCreatorComponent,
    canActivate: [roleGuard],
    data: {expectedRole: USER_ROLES.administrator}
  },
  {
    path: 'book',
    component: OfficeSpaceBookingComponent,
    canActivate: [roleGuard],
    data: {expectedRole: USER_ROLES.officeWorker}
  },
  {
    path: 'edit-booking/:id',
    component: OfficeSpaceBookingComponent,
    canActivate: [roleGuard],
    data: {expectedRole: USER_ROLES.officeWorker}
  },
  {
    path: 'my-bookings',
    component: MyBookingsComponent,
    canActivate: [roleGuard],
    data: {expectedRole: USER_ROLES.officeWorker}
  },
  {
    path: 'demo',
    component: DemoComponent,
  },
  {
    path: '**',
    redirectTo: ''
  }
];

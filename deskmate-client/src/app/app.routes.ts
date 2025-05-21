import {Routes} from '@angular/router';
import {AdminDashboardComponent} from './admin/pages/admin-dashboard/admin-dashboard.component';
import {OfficeLayoutCreatorComponent} from './admin/pages/office-layout-creator/office-layout-creator.component';
import {LoginPageComponent} from './core/auth/login-page/login-page.component';
import {DemoComponent} from './demo/demo.component';
import {OfficeSpaceBookingComponent} from './user/pages/office-space-booking/office-space-booking.component';
import {MyBookingsComponent} from './user/pages/my-bookings/my-bookings.component';


export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login',
  },
  {
    path: 'login',
    component: LoginPageComponent,
  },
  {
    path: 'admin-dashboard',
    component: AdminDashboardComponent,
  },
  {
    path: 'office-creator',
    component: OfficeLayoutCreatorComponent,
  },
  {
    path: 'book',
    component: OfficeSpaceBookingComponent,
  },
  {
    path: 'edit-booking/:id',
    component: OfficeSpaceBookingComponent,
  },
  {
    path: 'my-bookings',
    component: MyBookingsComponent,
  },
  {
    path: 'demo',
    component: DemoComponent,
  },
];

import { Routes } from '@angular/router';
import { AdminDashboardComponent } from './admin/pages/admin-dashboard/admin-dashboard.component';
import { OfficeLayoutCreatorComponent } from './admin/pages/office-layout-creator/office-layout-creator.component';
import { LoginPageComponent } from './core/auth/login-page/login-page.component';

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
];

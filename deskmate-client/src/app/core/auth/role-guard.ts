import {ActivatedRouteSnapshot, CanActivateFn, Router} from '@angular/router';
import {AuthService} from '../services/auth.service';
import {inject} from '@angular/core';
import {USER_ROLES} from './model/AuthTypes';


export const roleGuard: CanActivateFn = (route: ActivatedRouteSnapshot) => {

  const authService: AuthService = inject(AuthService);
  const router: Router = inject(Router);

  const rejectionRoutes: { role: string, route: string }[] = [
    {role: USER_ROLES.officeWorker, route: 'my-bookings'},
    {role: USER_ROLES.administrator, route: 'admin-dashboard'},
    {role: USER_ROLES.publicUser, route: 'login'}
  ];
  //TODO: navigate to login and session clear when token expired?
  const expectedRole = route?.data['expectedRole'];
  if (authService.getRoleFromToken() !== expectedRole) {
    const route = rejectionRoutes.find(value => authService.getRoleFromToken() === value.role)!;
    void router.navigate([route.route]);
    return false;
  }

  return true;
}
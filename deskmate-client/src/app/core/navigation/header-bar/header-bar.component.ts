import {Component, OnInit} from '@angular/core';
import {Router, RouterLink, RouterLinkActive} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {USER_ROLES} from '../../auth/model/AuthTypes';


@Component({
  selector: 'app-header-bar',
  imports: [
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './header-bar.component.html',
  styleUrl: './header-bar.component.scss'
})
export class HeaderBarComponent implements OnInit {

  private static readonly USER_MENU_LINKS: MenuLink[] = [
    {routerLink: '/my-bookings', linkText: 'My Reservations'},
    {routerLink: '/book', linkText: 'New Reservation'}
  ];

  private static readonly ADMIN_MENU_LINKS: MenuLink[] = [
    {routerLink: '/admin-dashboard', linkText: 'Admin dashboard'},
    {routerLink: '/office-creator', linkText: 'Office creator'},
  ];

  protected currentMenuLinks: MenuLink[] = [];

  constructor(private readonly authService: AuthService, private readonly router: Router) {
  }

  ngOnInit(): void {
    this.currentMenuLinks = this.getMenuLinksForRole();
    this.authService.getSessionEvents().subscribe(() => {
      this.currentMenuLinks = this.getMenuLinksForRole();
    })
  }

  private getMenuLinksForRole(): MenuLink[] {
    switch (this.authService.getRoleFromToken()) {
      case USER_ROLES.officeWorker:
        return HeaderBarComponent.USER_MENU_LINKS;
      case USER_ROLES.administrator:
        return HeaderBarComponent.ADMIN_MENU_LINKS;
      default:
        return [];
    }
  }

  logout() {
    this.authService.logout();
    void this.router.navigate(['/login']);
  }
}

interface MenuLink {
  routerLink: string;
  linkText: string
}
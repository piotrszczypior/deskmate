import { Component } from '@angular/core';
import { MatFormField, MatInput, MatLabel } from '@angular/material/input';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login-page',
  imports: [MatFormField, MatInput, MatLabel, FormsModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss',
})
export class LoginPageComponent {
  constructor(private router: Router) {}

  submit(): void {
    // TODO: service and HTTP call
    this.router.navigate(['admin-dashboard']);
  }
}

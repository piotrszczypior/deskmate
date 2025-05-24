import {Component, OnInit} from '@angular/core';
import {MatFormField, MatInput, MatLabel} from '@angular/material/input';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';


@Component({
  selector: 'app-login-page',
  imports: [MatFormField, MatInput, MatLabel, FormsModule, ReactiveFormsModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss',
})
export class LoginPageComponent implements OnInit {
  protected formGroup: FormGroup;

  constructor(
      private readonly router: Router,
      private readonly authService: AuthService,
      private readonly formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      username: [null, Validators.required],
      password: [null, Validators.required]
    })
  }

  submit(): void {
    this.authService.login(this.formGroup.get('username')?.value, this.formGroup.get('password')?.value).subscribe({
      next: (_) => void this.router.navigate(['']),
      error: err => console.log(err)
    });
  }
}

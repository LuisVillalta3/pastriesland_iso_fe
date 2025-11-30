import { Component } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {NgIf} from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import {AuthService} from '@/app/admin/modules/auth/auth.service';
import {NotificationService} from '@services/notification.service';
import {Router} from '@angular/router';
import {CookiesService} from '@/app/services/cookies.service';

@Component({
  selector: 'app-login',
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    NgIf,
    MatIconModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm: FormGroup;

  hidePassword = true;

  constructor(
    private fb: FormBuilder, private authService: AuthService,
    private notification: NotificationService,
    private cookieService: CookiesService,
    private router: Router,
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (!this.loginForm.valid) return;

    const { email, password } = this.loginForm.value;

    this.authService.login(email, password).subscribe({
      next: async (res) => {
        this.cookieService.saveToken(res.accessToken, 'admin')
        this.notification.show('Login exitoso')
        await this.router.navigate(['admin/categories'])
      },
      error: () => {
        this.notification.show("Email o contraseñas invalidos", "error")
      }
    })
  }

  get emailErrors() {
    if (this.loginForm.get('email')?.hasError('required'))
      return 'El email es obligatorio'

    if (this.loginForm.get('email')?.hasError('email'))
      return 'El email no es valido'

    return null;
  }

  get passwordErrors() {
    if (this.loginForm.get('password')?.hasError('required'))
      return 'La contraseña es obligatoria'

    return null;
  }

  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }
}

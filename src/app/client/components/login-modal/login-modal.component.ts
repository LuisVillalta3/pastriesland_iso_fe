import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {MatInput, MatInputModule, MatLabel} from '@angular/material/input';
import {MatIconButton} from '@angular/material/button';
import {NgIf} from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import {RegisterModalComponent} from '@client/components/register-modal/register-modal.component';
import {NotificationService} from '@services/notification.service';
import {CookiesService} from '@services/cookies.service';
import {AuthService} from '@client/services/auth.service';

@Component({
  selector: 'app-login-modal',
  imports: [
    MatInputModule,
    MatInput,
    MatLabel,
    MatIconModule,
    MatIconButton,
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './login-modal.component.html',
  styleUrl: './login-modal.component.scss'
})
export class LoginModalComponent {
  loginForm: FormGroup
  hidePassword = true

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<LoginModalComponent>,
    private dialog: MatDialog,
    private authService: AuthService,
    private notification: NotificationService,
    private cookieService: CookiesService,
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    })
  }

  submit() {
    if (this.loginForm.invalid) return;

    const { password, email } = this.loginForm.value

    this.authService.login(email, password).subscribe({
      next: (res) => {
        this.cookieService.saveToken(res.accessToken, 'client')
        this.cookieService.saveUserID(res.user.id)
        this.notification.show('Usuario loggeado correctamente')
        this.close()
      }
    })
  }

  close() {
    this.dialogRef.close()
  }

  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword
  }

  openRegisterModal() {
    const dialogRef = this.dialog.open(RegisterModalComponent, {
      minWidth: '250px',
      maxWidth: '1024px',
      width: 'calc(100% - 2rem)',
    })

    dialogRef.afterClosed().subscribe()

    this.close()
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
}

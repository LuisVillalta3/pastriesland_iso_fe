import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {MatIconButton} from '@angular/material/button';
import {MatInput, MatInputModule, MatLabel} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {LoginModalComponent} from '@client/components/login-modal/login-modal.component';
import {NgIf} from '@angular/common';
import {NotificationService} from '@services/notification.service';
import {CookiesService} from '@services/cookies.service';
import {AuthService} from '@client/services/auth.service';

@Component({
  selector: 'app-register-modal',
  imports: [
    MatInputModule,
    MatInput,
    MatLabel,
    MatIconModule,
    MatIconButton,
    ReactiveFormsModule,
    NgIf,
  ],
  templateUrl: './register-modal.component.html',
  styleUrl: './register-modal.component.scss'
})
export class RegisterModalComponent {
  loginForm: FormGroup
  hidePassword = true

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<RegisterModalComponent>,
    private dialog: MatDialog,
    private authService: AuthService,
    private notification: NotificationService,
    private cookieService: CookiesService,
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
      name: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
    })

    //, {
    //       validators: this.passwordsMatchValidator,
    //     }
  }

  passwordsMatchValidator(form: FormGroup) {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }


  submit() {
    if (this.loginForm.invalid) return;

    const { name, lastName, password, email } = this.loginForm.value

    this.authService.register({
      email, password, name, lastName
    }).subscribe({
      next: (res) => this.login(email, password),
    })
  }

  login(email: string, password: string) {
    this.authService.login(email, password).subscribe({
      next: (res) => {
        this.cookieService.saveToken(res.accessToken, 'client')
        this.notification.show('Usuario registrado correctamente')
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
    const dialogRef = this.dialog.open(LoginModalComponent, {
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

  get confirmPasswordErrors() {
    if (this.loginForm.get('confirmPassword')?.hasError('required'))
      return 'Tienes que confirmar la contraseña'

    if (this.loginForm.hasError('passwordMismatch'))
      return 'Las contraseñas no coinciden'

    return null;
  }

  get nameErrors() {
    if (this.loginForm.get('name')?.hasError('required'))
      return 'El nombre es obligatorio'

    return null;
  }

  get lastNameErrors() {
    if (this.loginForm.get('lastName')?.hasError('required'))
      return 'El apellido es obligatorio'

    return null;
  }
}

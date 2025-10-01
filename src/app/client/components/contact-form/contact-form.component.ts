import {Component} from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {NgIf} from '@angular/common';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {NotificationService} from '@services/notification.service';
import {NgxMaskDirective, provideNgxMask} from 'ngx-mask';

@Component({
  selector: 'app-contact-form',
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    NgIf,
    NgxMaskDirective,
  ],
  providers: [provideNgxMask()],
  templateUrl: './contact-form.component.html',
  styleUrl: './contact-form.component.scss'
})
export class ContactFormComponent {
  contactForm: FormGroup

  constructor(
    private fb: FormBuilder,
    private notification: NotificationService,
  ) {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      whatsapp: ['', [Validators.required]],
      message: [''],
    })
  }

  get emailErrors() {
    if (this.contactForm.get('email')?.hasError('required'))
      return 'El email es requerido'

    if (this.contactForm.get('email')?.hasError('email'))
      return 'El email no es valido'

    return null;
  }

  get nameErrors() {
    if (this.contactForm.get('name')?.hasError('required'))
      return 'Tu nombre es requerido'

    return null;
  }

  get whatsappErrors() {
    if (this.contactForm.get('whatsapp')?.hasError('required'))
      return 'Tu WhatsApp es requerido'

    return null;
  }

  submit() {
    if (this.contactForm.invalid) return

    this.notification.show('Gracias por contactarnos, pronto te responderemos')
  }
}

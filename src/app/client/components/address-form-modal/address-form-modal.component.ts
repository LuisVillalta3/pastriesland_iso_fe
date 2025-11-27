import { Component } from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatInput, MatInputModule, MatLabel} from '@angular/material/input';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-address-form-modal',
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatInput,
    MatLabel,
    NgIf,
  ],
  templateUrl: './address-form-modal.component.html',
  styleUrl: './address-form-modal.component.scss'
})
export class AddressFormModalComponent {
  form: FormGroup

  constructor(
    private dialogRef: MatDialogRef<AddressFormModalComponent>,
    private fb: FormBuilder,
  ) {
    this.form = this.fb.group({
      addressName: ['', [Validators.required]],
      address: ['', [Validators.required]],
    })
  }

  close() {
    this.dialogRef.close();
  }

  get addressNameErrors() {
    const control = this.form.get('addressName');
    if (control?.hasError('required')) {
      return 'El nombre de la dirección es obligatorio';
    }
    return '';
  }

  get addressErrors() {
    const control = this.form.get('address');
    if (control?.hasError('required')) {
      return 'La dirección es obligatoria';
    }
    return '';
  }

  submit() {
    if (this.form.invalid) return

    console.log("SE CREA LA DIRECCIÓN", this.form.value);

  }
}

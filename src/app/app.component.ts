import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {CookieService} from 'ngx-cookie-service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ReactiveFormsModule, MatSnackBarModule],
  providers: [CookieService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';
import {routes} from './admin.route';
import {AdminLayoutComponent} from './layouts/admin-layout/admin-layout.component';
import {LoginLayoutComponent} from './layouts/login-layout/login-layout.component';
import {LoginComponent} from './pages/login/login.component';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    LoginLayoutComponent,
    LoginComponent,
    AdminLayoutComponent,
  ]
})
export class AdminModule { }

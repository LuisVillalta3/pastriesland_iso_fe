import {Routes} from '@angular/router';
import {HomeComponent} from '@client/pages/home/home.component';
import {MainLayoutComponent} from '@client/layouts/main-layout/main-layout.component';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: '', component: HomeComponent },
    ],
  }
]

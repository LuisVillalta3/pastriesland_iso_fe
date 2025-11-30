import {Routes} from '@angular/router';
import {AdminLayoutComponent} from './layouts/admin-layout/admin-layout.component';
import {LoginLayoutComponent} from './layouts/login-layout/login-layout.component';
import {LoginComponent} from './pages/login/login.component';
import {adminGuard} from '@/app/guards/admin.guard';
import {adminLoginGuard} from '@/app/guards/admin-login.guard';

export const routes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    canActivate: [adminGuard],
    children: [
      { path: '', redirectTo: 'categories', pathMatch: 'full' },
      {
        path: 'categories',
        loadChildren: () =>
          import('./modules/categories/categories.module').then(m => m.CategoriesModule)
      },
      {
        path: 'products',
        loadChildren: () =>
          import('./modules/products/products.module').then(m => m.ProductsModule)
      },
      {
        path: 'contacts',
        loadChildren: () =>
          import('./modules/contacts/contacts.module').then(m => m.ContactsModule)
      }
    ]
  },
  {
    path: 'login',
    component: LoginLayoutComponent,
    canActivate: [adminLoginGuard],
    children: [
      { path: '', component: LoginComponent }
    ]
  }
];


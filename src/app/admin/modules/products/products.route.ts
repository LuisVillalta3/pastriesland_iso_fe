import {Routes} from '@angular/router';
import {ListComponent} from '@/app/admin/modules/products/pages/list/list.component';
import {FormComponent} from '@admin/modules/products/pages/form/form.component';

export const routes: Routes = [
  { path: '', component: ListComponent },
  { path: 'create', component: FormComponent },
  { path: ':id/edit', component: FormComponent }
];

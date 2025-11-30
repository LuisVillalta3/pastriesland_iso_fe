import {Routes} from '@angular/router';
import {ListComponent} from './pages/list/list.component';
import {FormComponent} from './pages/form/form.component';

export const routes: Routes = [
  { path: '', component: ListComponent },
  { path: 'create', component: FormComponent },
  { path: ':id/edit', component: FormComponent }
];

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CustomerFormComponent } from './customer-form/customer-form.component';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { CustomerComponent } from './customer.component';

const routes: Routes = [{
  path: '',
  component: CustomerComponent,
  children: [{
    path: 'list',
    component: CustomerListComponent,
  }, {
    path: 'form/:id',
    component: CustomerFormComponent,
  }],
}];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule,
  ],
})
export class CustomerRoutingModule { }

export const routedComponents = [
  CustomerComponent,
  CustomerListComponent,
  CustomerFormComponent
];

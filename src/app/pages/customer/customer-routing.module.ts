import { CustomerListComponent } from './customer-list/customer-list.component';
import { CustomerComponent } from './customer.component';

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{
  path: '',
  component: CustomerComponent,
  children: [{
    path: 'list',
    component: CustomerListComponent,
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
];

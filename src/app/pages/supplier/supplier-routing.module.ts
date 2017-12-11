import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SupplierFormComponent } from './supplier-form/supplier-form.component';
import { SupplierListComponent } from './supplier-list/supplier-list.component';
import { SupplierComponent } from './supplier.component';


const routes: Routes = [{
  path: '',
  component: SupplierComponent,
  children: [{
    path: 'list',
    component:  SupplierListComponent,
  }, {
    path: 'form/:id',
    component: SupplierFormComponent,
  }, {
    path: 'form',
    component: SupplierFormComponent,
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
export class SupplierRoutingModule { }

export const routedComponents = [
  SupplierComponent,
  SupplierListComponent,
  SupplierFormComponent
];
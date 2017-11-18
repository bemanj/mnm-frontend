import { InventoryFormComponent } from './inventory-form/inventory-form.component';
import { InventoryListComponent } from './inventory-list/inventory-list.component';
import { InventoryComponent } from './inventory.component';

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{
  path: '',
  component: InventoryComponent,
  children: [{
    path: 'list',
    component: InventoryListComponent,
  }, {
    path: 'form/:id',
    component: InventoryFormComponent,
  }, {
    path: 'form',
    component: InventoryFormComponent,
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
export class InventoryRoutingModule { }

export const routedComponents = [
  InventoryComponent,
  InventoryListComponent,
  InventoryFormComponent
];

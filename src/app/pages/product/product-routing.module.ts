import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CategoryComponent } from './category/category.component';
import { ProductFormComponent } from './product-form/product-form.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductComponent } from './product.component';

const routes: Routes = [{
  path: '',
  component: ProductComponent,
  children: [{
    path: 'category',
    component: CategoryComponent,
  }, {
    path: 'form',
    component: ProductFormComponent,
  }, {
    path: 'list',
    component: ProductListComponent,
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
export class ProductRoutingModule { }

export const routedComponents = [
  ProductComponent,
  ProductListComponent,
  ProductFormComponent,
  CategoryComponent
];
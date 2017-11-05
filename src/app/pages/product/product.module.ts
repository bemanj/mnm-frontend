import { NgModule } from '@angular/core';

import { ThemeModule } from '../../@theme/theme.module';
import { ProductService } from './../../@core/data/services/product/product.service';
import { ProductRoutingModule, routedComponents } from './product-routing.module';

@NgModule({
  imports: [
    ThemeModule,
    ProductRoutingModule
  ],
  declarations: [
    ...routedComponents,
  ],
  providers: [
    ProductService
  ]
})
export class ProductModule { }

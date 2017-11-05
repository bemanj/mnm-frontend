import { ProductRoutingModule, routedComponents } from './product-routing.module';
import { ThemeModule } from '../../@theme/theme.module';
import { NgModule } from '@angular/core';

@NgModule({
  imports: [
    ThemeModule,
    ProductRoutingModule
  ],
  declarations: [
    ...routedComponents,
  ],
})
export class ProductModule { }

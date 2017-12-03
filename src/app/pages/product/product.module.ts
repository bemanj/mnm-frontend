import { NgModule } from '@angular/core';
import { Ng2SmartTableModule } from 'ng2-smart-table';

import { ThemeModule } from '../../@theme/theme.module';
import { ProductService } from './../../@core/data/services/product/product.service';
import { SmartTableService } from './../../@core/data/smart-table.service';
import { ProductRoutingModule, routedComponents } from './product-routing.module';
import { BrandListComponent } from './brand-list/brand-list.component';

@NgModule({
  imports: [
    ThemeModule,
    Ng2SmartTableModule,
    ProductRoutingModule
  ],
  declarations: [
    ...routedComponents,
  ],
  providers: [
    SmartTableService,
    ProductService
  ]
})
export class ProductModule { }

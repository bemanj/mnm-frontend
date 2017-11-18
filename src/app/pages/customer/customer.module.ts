import { NgModule } from '@angular/core';
import { DataTableModule } from 'angular-4-data-table/dist';
import { Ng2SmartTableModule } from 'ng2-smart-table';

import { BrandService } from '../../@core/data/services/brand/brand.service';
import { InventoryService } from '../../@core/data/services/inventory/inventory.service';
import { SupplierService } from '../../@core/data/services/supplier/supplier.service';
import { ThemeModule } from '../../@theme/theme.module';
import { ProductService } from './../../@core/data/services/product/product.service';
import { SmartTableService } from './../../@core/data/smart-table.service';
import { CustomerRoutingModule, routedComponents } from './customer-routing.module';

@NgModule({
  imports: [
    ThemeModule,
    DataTableModule,
    CustomerRoutingModule,
    Ng2SmartTableModule,
  ],
  declarations: [
    ...routedComponents,
  ],
  providers: [
    SmartTableService,
  ]
})
export class CustomerModule { }

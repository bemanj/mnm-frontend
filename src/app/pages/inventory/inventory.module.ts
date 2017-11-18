import { ProductService } from './../../@core/data/services/product/product.service';
import { NgModule } from '@angular/core';
import { DataTableModule } from 'angular-4-data-table/dist';
import { Ng2SmartTableModule } from 'ng2-smart-table';

import { InventoryService } from '../../@core/data/services/inventory/inventory.service';
import { ThemeModule } from '../../@theme/theme.module';
import { SmartTableService } from './../../@core/data/smart-table.service';
import { InventoryRoutingModule, routedComponents } from './inventory-routing.module';
import { SupplierService } from '../../@core/data/services/supplier/supplier.service';
import { BrandService } from '../../@core/data/services/brand/brand.service';

@NgModule({
  imports: [
    ThemeModule,
    DataTableModule,
    InventoryRoutingModule,
    Ng2SmartTableModule,
  ],
  declarations: [
    ...routedComponents,
  ],
  providers: [
    SmartTableService,
    InventoryService,
    SupplierService,
    BrandService,
    ProductService
  ]
})
export class InventoryModule { }

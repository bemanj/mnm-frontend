import { NgModule } from '@angular/core';
import { DataTableModule } from 'angular-4-data-table/dist';
import { Ng2SmartTableModule } from 'ng2-smart-table';

import { InventoryService } from '../../@core/data/services/inventory/inventory.service';
import { ThemeModule } from '../../@theme/theme.module';
import { CustomerService } from './../../@core/data/services/customer/customer.service';
import { SmartTableService } from './../../@core/data/smart-table.service';
import { routedComponents, SalesRoutingModule } from './sales-routing.module';
import { SelectProductV2Component } from './order-form/selection/select-product-v2/select-product-v2.component';
import { OrderDetailV2Component } from './order-form/selection/order-detail-v2/order-detail-v2.component';

@NgModule({
  imports: [
    ThemeModule,
    DataTableModule,
    SalesRoutingModule,
    Ng2SmartTableModule,
  ],
  declarations: [
    ...routedComponents,
    SelectProductV2Component,
    OrderDetailV2Component,
  ],
  providers: [
    SmartTableService,
    CustomerService,
    InventoryService
  ]
})
export class SalesModule { }

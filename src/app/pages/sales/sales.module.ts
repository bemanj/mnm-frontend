import { NgModule } from '@angular/core';
import { DataTableModule } from 'angular-4-data-table/dist';
import { Ng2SmartTableModule } from 'ng2-smart-table';

import { ThemeModule } from '../../@theme/theme.module';
import { CustomerService } from './../../@core/data/services/customer/customer.service';
import { SmartTableService } from './../../@core/data/smart-table.service';
import { routedComponents, SalesRoutingModule } from './sales-routing.module';

@NgModule({
  imports: [
    ThemeModule,
    DataTableModule,
    SalesRoutingModule,
    Ng2SmartTableModule,
  ],
  declarations: [
    ...routedComponents,
  ],
  providers: [
    SmartTableService,
    CustomerService
  ]
})
export class SalesModule { }

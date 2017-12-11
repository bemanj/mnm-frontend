import { NgModule } from '@angular/core';
import { Ng2SmartTableModule } from 'ng2-smart-table';

import { SupplierService } from '../../@core/data/services/supplier/supplier.service';
import { ThemeModule } from '../../@theme/theme.module';
import { SmartTableService } from './../../@core/data/smart-table.service';
import { routedComponents, SupplierRoutingModule } from './supplier-routing.module';

@NgModule({
  imports: [
    ThemeModule,
    Ng2SmartTableModule,
    SupplierRoutingModule
  ],
  declarations: [
    ...routedComponents,
  ],
  providers: [
    SmartTableService,
    SupplierService
  ]
})
export class SupplierModule { }

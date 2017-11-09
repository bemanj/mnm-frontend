import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';

import { SalesSummaryComponent } from './../../pages/sales/sales-summary/sales-summary.component';
import { ElectricityService } from './electricity.service';
import { PlayerService } from './player.service';
import { ConfigService } from './services/config/config.service';
import { CustomerService } from './services/customer/customer.service';
import { GlobalService } from './services/global/global.service';
import { InventoryService } from './services/inventory/inventory.service';
import { PrintService } from './services/print/print.service';
import { DetailService } from './services/sales/order/detail.service';
import { HeaderService } from './services/sales/order/header.service';
import { SalesReportService } from './services/sales/sales-report.service';
import { SmartTableService } from './smart-table.service';
import { StateService } from './state.service';
import { UserService } from './users.service';

const SERVICES = [
  UserService,
  ElectricityService,
  StateService,
  SmartTableService,
  PlayerService,
  ConfigService,
  GlobalService,
  CustomerService,
  SalesReportService,
  InventoryService,
  SalesSummaryComponent,
  PrintService,
  HeaderService,
  DetailService
];

@NgModule({
  imports: [
    CommonModule,
  ],
  providers: [
    ...SERVICES,
  ],
})
export class DataModule {
  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders>{
      ngModule: DataModule,
      providers: [
        ...SERVICES,
      ],
    };
  }
}

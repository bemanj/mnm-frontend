import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { OrderFormComponent } from './order-form/order-form.component';
import { PrintComponent } from './order-form/print/print.component';
import { OrderDetailComponent } from './order-form/selection/order-detail/order-detail.component';
import { SelectProductComponent } from './order-form/selection/select-product/select-product.component';
import { SalesDashboardComponent } from './sales-dashboard/sales-dashboard.component';
import { SalesOrderComponent } from './sales-order/sales-order.component';
import { SalesReportComponent } from './sales-report/sales-report.component';
import { SalesSummaryComponent } from './sales-summary/sales-summary.component';
import { SalesComponent } from './sales.component';

const routes: Routes = [{
  path: '',
  component: SalesComponent,
  children: [{
    path: 'dashboard',
    component: SalesDashboardComponent,
  }, {
    path: 'summary',
    component: SalesSummaryComponent,
  }, {
    path: 'form/:id',
    component: OrderFormComponent,
  }, {
    path: 'print/:id',
    component: PrintComponent,
  }, {
    path: 'detail',
    component: OrderDetailComponent,
  }, {
    path: 'select',
    component: SelectProductComponent,
  }, {
    path: 'report',
    component: SalesReportComponent,
  }, {
    path: 'order',
    component: SalesOrderComponent,
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
export class SalesRoutingModule {

}

export const routedComponents = [
  SalesComponent,
  OrderDetailComponent,
  SelectProductComponent,
  PrintComponent,
  OrderFormComponent,
  SalesDashboardComponent,
  SalesSummaryComponent,
  SalesReportComponent,
  SalesOrderComponent
];

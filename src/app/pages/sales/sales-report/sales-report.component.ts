import { SalesReport } from './../../../@core/models/sales-report';
import { SalesReportService } from './../../../@core/data/services/sales/sales-report.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { DataTableResource } from 'angular-4-data-table';

import { Component, OnInit, Input, NgModule } from '@angular/core';

@Component({
  selector: 'ngx-sales-report',
  templateUrl: './sales-report.component.html',
  styleUrls: ['./sales-report.component.scss']
})
export class SalesReportComponent implements OnInit  {
  categories$;
  totalSales;
  reporttype;
  orderHeader = {};
  data = '';
  postStatus : any;
  salesReport: SalesReport[];
  subscription: Subscription;
  tableResource: DataTableResource<SalesReport>;
  items: SalesReport[] = [];
  itemCount: number;

  // @Input('category') category;

  constructor(
    private salesreportservice : SalesReportService,
    private router: Router) { 
    // this.getCategories();
    // this.getTotalSales();
  } 

  private initializeTable(sales: SalesReport[]) {
    this.tableResource = new DataTableResource(sales);
    this.tableResource.query({ offset: 0 })
      .then(items => this.items = items);
    this.tableResource.count()
      .then(count => this.itemCount = count);
  }
  
  rowDoubleClick(rowEvent) {
    // console.log(rowEvent.row.item.SalesOrderID);
    this.router.navigate(['/sales-order', rowEvent.row.item.SalesOrderID]);
    // console.log('Double clicked: ' + rowEvent.row.item.$id);
  }

  rowTooltip(item) { return item.SalesOrderNumber; }

  loadSO(params){
    if (!this.tableResource) return;
            console.log(params)
  }

  reloadItems(params) {
    if (!this.tableResource) return;

    this.tableResource.query(params)
      .then(items => this.items = items);    
  }

  onselectedreport(value) {
    if (value == 'fullfilled') {
      console.log(1);
      this.getFullfilled();

    } else if (value == 'notsettled') {
      console.log(2);
      this.getNotSettled();

    } else if (value == 'settled') {
      console.log(3);
      this.getSettled();
      
    }
    
  }
 
  getTotalSalesByDateRange() {
    this.salesreportservice.getTotalSalesByDateRange('day1')
    .subscribe(data => {
      console.log(data);
      // this.totalSales = data
    });
  }

  save(orderHeader) {
    this.router.navigate(['/sales-order']);
  } 

  getSalesReport() {
    
  }

  getFullfilled() {
    this.subscription = this.salesreportservice.getFulfilledSO()
    .subscribe(salesReport => {
      this.salesReport = salesReport;
      this.initializeTable(salesReport);
    });
  }

  getNotSettled() {
    this.subscription = this.salesreportservice.getNotSettledSO()
    .subscribe(salesReport => {
      this.salesReport = salesReport;
      this.initializeTable(salesReport);
    });
  }

  getSettled() {
    this.subscription = this.salesreportservice.getSettledSO()
    .subscribe(salesReport => {
      this.salesReport = salesReport;
      this.initializeTable(salesReport);
    });
  }

  ngOnInit() {
    // this.subscription = this.salesreportservice.getFulfilledSO()
    // .subscribe(salesReport => {
    //   this.salesReport = salesReport;
    //   this.initializeTable(salesReport);
    // });

    // this.getTotalSalesByDateRange()
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}

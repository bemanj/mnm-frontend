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

    this.subscription = this.salesreportservice.getAllSO()
    .subscribe(salesReport => {
      this.salesReport = salesReport;
      this.initializeTable(salesReport);
    });
    
    this.getTotalSales();    
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

  // filter(query: string) { 
  //   let filteredSales = (query) ?
  //     this.salesReport.filter(p => p.salesOrderNumber..includes(query)) :
  //     this.salesReport;

  //   this.initializeTable(filteredSales);
  // }

  getTotalSales() {
    this.salesreportservice.getAllTotalSales().subscribe(data => this.totalSales = data);
  }

 

  save(orderHeader) {
    this.router.navigate(['/sales-order']);
  } 

  // save(orderHeader) {
    
  //       this.router.navigate(['/inventory-list']);
  //       var date = new Date();
  //       var data = {
  //         //SalesOrderID: 1
  //         OrderDate: date,
  //         //, OnlineOrderFlag: true
  //         //, SalesOrderNumber: 'SO1'
  //         SubTotal: 0,
  //         TaxAmt: 0,
  //         Freight: 0,
  //         //TotalDue: soTotalDue,
  //         Comment: 0,
  //         ModifiedDate: date
  //       }
  //       console.log(data);
  //       this.salesreportservice.create(data);
  //     } 
      
  // var data = {
  //   //SalesOrderID: 1
  //   OrderDate: date,
  //   //, OnlineOrderFlag: true
  //   //, SalesOrderNumber: 'SO1'
  //   SubTotal: orderHeader.soSubTotal,
  //   TaxAmt: orderHeader.soTaxAmt,
  //   Freight: orderHeader.soFreight,
  //   //TotalDue: soTotalDue,
  //   Comment: orderHeader.soComment,
  //   ModifiedDate: date
  // }
    getSalesReport() {
      
    }

     ngOnInit() {
    }

    ngOnDestroy(){
      this.subscription.unsubscribe();
    }
}

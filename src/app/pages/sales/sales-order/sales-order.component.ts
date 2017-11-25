import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';

import { SmartTableService } from '../../../@core/data/smart-table.service';
import { SalesReportService } from './../../../@core/data/services/sales/sales-report.service';

@Component({
  selector: 'ngx-sales-order',
  templateUrl: './sales-order.component.html',
  styles: [`
    nb-card {
      transform: translate3d(0, 0, 0);
    }
  `],
})
export class SalesOrderComponent  implements OnInit{

  data: any;

  settings = {
    actions: false,
    columns: {
      SalesOrderID: {
        title: 'Sales Order Number',
        type: 'number',
      },
      CompanyName: {
        title: 'Customer',
        type: 'string',
      },
      CreatedDate: {
        title: 'Date Created',
        valuePrepareFunction: (date) => {
          var raw = new Date(date);

          var formatted = new DatePipe('en-EN').transform(raw, 'dd MMMM yyyy');
          // var formatted = new DatePipe('en-EN').transform(raw, 'dd MMM yyyy HH:mm:ss');
          return formatted;
        }
        // type: 'date',
      },
      TotalDue: {
        title: 'Total Due',
        // Currency format to PHP
        valuePrepareFunction: (value) => { return value === 'Total'? value : Intl.NumberFormat('en-US',{style:'currency', currency: 'PHP'}).format(value)}
      },
    },
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(private service: SmartTableService,
              private salesreportservice: SalesReportService,
              private router: Router) {
    // const data = this.service.getData();
    // this.source.load(data);
  }

  ngOnInit() {
    this.salesreportservice.getAllSO()
    .subscribe(s => {
      this.data = s;
      // console.log(this.data);
      this.source.load(this.data);
    });
  }

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }

  onUserRowSelect(event): void {
    // Return SalesOrderID
    console.log(event.data.SalesOrderID);
    // Open to Sales Order Form
    // this.router.navigate(['/pages/sales/order', event.data.SalesOrderID]);
    this.router.navigate(['/pages/sales/form', event.data.SalesOrderID]);
  }

  save(event) {
        const date = new Date();
        const sodata = {
          Customer: '0',
          OnlineOrderFlag: '',
          SubTotal: 0, // orderHeader.soSubTotal,
          TaxAmt: 0, // orderHeader.soTaxAmt,
          Freight: 0, // orderHeader.soFreight,
          TotalDue: 0,
          Comment: 'test', // orderHeader.soComment,
          Fulfilled: ''
        };
    
      this.salesreportservice.create(sodata).subscribe(newso => {
        this.router.navigate(['/pages/sales/form', newso.SalesOrderID]);
          });
      }

  
}

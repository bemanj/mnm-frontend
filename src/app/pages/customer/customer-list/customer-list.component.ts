import { CustomerService } from '../../../@core/data/services/customer/customer.service';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';

import { SmartTableService } from '../../../@core/data/smart-table.service';

@Component({
  selector: 'ngx-customer-list',
  templateUrl: './customer-list.component.html',
  styles: [`
  nb-card {
    transform: translate3d(0, 0, 0);
  }
`],
})
export class CustomerListComponent implements OnInit {

  data: any;
  
    settings = {
      actions: false,
      columns: {
        CustomerID: {
          title: 'ID',
          type: 'number',
        },
        CompanyName: {
          title: 'Customer',
          type: 'string',
        },
        ContactName: {
          title: 'Contact',
          type: 'string',
        },
        Address: {
          title: 'Address',
          type: 'string',
        },
        City: {
          title: 'City',
          type: 'string',
        },
        Region: {
          title: 'Region',
          type: 'string',
        },
        Phone: {
          title: 'Phone',
          type: 'string',
        },
        Fax: {
          title: 'Fax',
          type: 'string',
        },
        Terms: {
          title: 'Terms',
          type: 'string',
        },
      },
    };
  
    source: LocalDataSource = new LocalDataSource();
  
    constructor(private service: SmartTableService,
                private customerervice: CustomerService,
                private router: Router) {
      // const data = this.service.getData();
      // this.source.load(data);
    }
  
    ngOnInit() {
      this.customerervice.getAll()
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
      this.router.navigate(['/pages/customer/form', event.data.CustomerID]);
    }
  
    save(event) {
          const data = {
            CompanyName: 'Replace this text',
          };
      
        this.customerervice.create(data).subscribe(c => {
          this.router.navigate(['/pages/customer/form', c.CustomerID]);
        });
    }
  
    
  }
  
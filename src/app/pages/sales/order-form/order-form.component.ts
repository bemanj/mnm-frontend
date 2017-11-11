import { GlobalService } from '../../../@core/data/services/global/global.service';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/take';

import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { CustomerService } from './../../../@core/data/services/customer/customer.service';
import { SalesReportService } from './../../../@core/data/services/sales/sales-report.service';
import { CustomerList } from './../../../@core/models/customer';

@Component({
  selector: 'ngx-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.scss']
})
export class OrderFormComponent implements OnInit, OnDestroy {
  salesorderid;
  customer$: CustomerList[];
  customerinfo = {};
  item = {};
  address = {};
  soHeader = {};
  message: any;
  subscription: Subscription;

  constructor(private route: ActivatedRoute,
              private salesreportservice: SalesReportService,
              private customerservice: CustomerService,
              private globalservice: GlobalService,
              private router: Router) { 
                this.subscription = this.globalservice.getMessage().subscribe(m => { this.message = m; });
              }

  ngOnInit() {
    // Get sales order id
    this.salesorderid = this.route.snapshot.paramMap.get('id');
    // Load the data of the selected sales order id
    this.salesreportservice.getfSO(this.salesorderid).take(1).subscribe(p => {
      this.soHeader = p;
      console.log(this.soHeader);
    });
    // Load customer list
    this.customerservice.getAll().subscribe(c => {
      this.customer$ = c;
      console.log(this.customer$);
    });
    // console.log('soid ' + this.salesorderid);
  }

  backtoSO() {
    // this.router.navigate(['/sales-order', id]);
    history.back()
  }

  updateSO(item) {
     // alert('test save function');
     debugger
     alert('Sales order will be updated');
     
           console.log('coy ' + item.Company);
     
           const date = new Date();
     
           const sodata = {
             SalesOrderID: this.salesorderid,
             Customer: item.customer,
            //  TaxAmt: item.TaxAmt, // orderHeader.soTaxAmt,
            //  Freight: item.Freight, // orderHeader.soFreight,
             Comment: item.comment, // orderHeader.soComment,
            //  OrderDate: date, // create alternative that not includes update of order date column
             ModifiedDate: date,
             OnlineOrderFlag: item.Flag
           };
           console.log(sodata);
           this.salesreportservice.update(this.salesorderid, sodata)
           .subscribe();
             // console.log('update so' + this.orderHeader.SalesOrderID)
         }

  // on customer change
  onselectedcustomer(data) {
    // console.log(data);
    this.customerinfo = {};
    // return data of customer
    if (data) {
      this.customerinfo = this.customer$.find(c => c.CustomerID == data);
    }
    // this.address = this.customerinfo.Address +
    // console.log(this.customerinfo);
  }

  print(id) {
    // console.log(id);
    this.router.navigate(['/pages/sales/print', id]);
  }
  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.subscription.unsubscribe();    
  }

}

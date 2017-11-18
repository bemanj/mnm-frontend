import { SalesReportService } from '../../../../@core/data/services/sales/sales-report.service';
import { PrintService } from './../../../../@core/data/services/print/print.service';
// import { ActivatedRoute } from '@angular/router';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import { Subscription } from 'rxjs/Subscription';
import { AngularPrint } from 'angular-print';
import { CustomerService } from '../../../../@core/data/services/customer/customer.service';

@Component({
  selector: 'ngx-print',
  templateUrl: './print.component.html',
  styleUrls: ['./print.component.scss']
})
export class PrintComponent implements OnInit {
    orderHeader = {};
    order;
    orderItems;
    someThis;
    customerinfo = {};
    id;
    subscription: Subscription;

  constructor(
  // private db : AngularFireDatabase,
  private router: Router,
  private route: ActivatedRoute,
  private printService: PrintService,
  private customerservice: CustomerService,
  private salesreportservice: SalesReportService) {

  }

  getItems1 (id) {
    // let item;
    //  return this.db.list('/orders/'+ id + '/items/').subscribe(orders => item = orders);
  }

  backtoSO(id) {
    // this.router.navigate(['/sales-order', id]);
    history.back()
  }

  print(printSectionId): void {
    let printContents, popupWin;
    printContents = document.getElementById(printSectionId).innerHTML;
    popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
    popupWin.document.open();
    popupWin.document.write(`
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8" />
        <style>
        .orders {
          table-layout: fixed;
          width: 100%;
          height: 100%;
          white-space: nowrap;
        }
         .orders td {
           white-space: nowrap;
           overflow: hidden;
           text-overflow: ellipsis;
         }
        .val td {
            border: 1px solid black;
            border-collapse: collapse;
        }
        .bordered {
          border: 1px solid black;
                border-collapse: collapse;
        }
        .closerightborder {
          border-top: 1px solid black;
          border-right: 1px solid black;
          border-bottom: 1px solid black;
        }
        .topbottomborder {
          border-top: 1px solid black;
          border-bottom: 1px solid black;
        }
        .bottomborder {
          border-bottom: 1px solid black;
        }
        .topborder {
          border-top : 1px solid black;
        }
        .txtcenter {
          text-align: center;
        }
        .txtleft {
          text-align: left;
        }
        .txtright {
          text-align: right;
        }
        .fixheight {
          line-height: 20px;
          height: 20px;
        }
        </style>
    </head>

    <body onload="window.print();window.close()">${printContents}
    </body>
    </html>
      `
    );
    popupWin.document.close();
  }

  // on customer change
  onselectedcustomer(data) {
    // this.customerinfo = {};
    // return data of customer
    if (data) {
      // debugger
      this.customerservice.getById(data)
        .subscribe(c => {
          this.customerinfo = c
        });
    }
  }

  ngOnDestroy() {
    // this.subscription.unsubscribe();
  }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.salesreportservice.getfSO(this.id).take(1).subscribe(p => {
        this.orderHeader = p;
        // console.log('so datalist');
        // console.log(this.orderHeader);
        this.onselectedcustomer(p.Customer);
        this.printService.get(this.id).subscribe(o => {
            this.order = o;
              // console.log(this.order);
        });
      });
    }

  }

}

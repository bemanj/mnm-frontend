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
    id;
    subscription: Subscription;

  constructor(
  // private db : AngularFireDatabase,
  private router: Router,
  private route: ActivatedRoute,
  private printService: PrintService,
  private salesreportservice: SalesReportService) {

    // this.id = this.route.snapshot.paramMap.get('id');
    // this.order = orderService.getOrdersByOrderId(this.id);

    // this.id = this.route.snapshot.paramMap.get('id')
    // if (this.id) this.printService.get(this.id).take(1).subscribe(o => {
    //     this.order = o
    //     console.log(this.order)
    // });
    // if (this.id) this.printService.getItems(this.id);//.subscribe(o => this.orderItems = o);
    // this.orderItems = this.getItems1(this.id);
    // console.log(this.orderItems.title);
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
          .val td {
              border: 1px solid black;
              border-collapse: collapse;
          }
          .bordered {
            border: 1px solid black;
                  border-collapse: collapse;
          }
          .bottomborder{
            border-bottom: 1px solid black;
          }
          .topborder{
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

  // getItems1 (id){
  //   return this.db.list('/orders/'+ id + '/items/')
  //         .subscribe(orders => {
  //           this.orders = orders;
  //           console.log(this.orders);
  //         });
  // }

  // getItems2 (){
  //   return this.db.list('/orders').map((items) => {
  //     return items.map(item => {
  //       item.metadata = this.db.object('/items/' + item.$key + '/product/');
  //       return item;
  //     });
  //   })
  // }


  ngOnDestroy() {
    // this.subscription.unsubscribe();
  }
  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.salesreportservice.getfSO(this.id).take(1).subscribe(p => {
        this.orderHeader = p;
        console.log('so datalist');
        console.log(this.orderHeader);
        this.printService.get(this.id).subscribe(o => {
            this.order = o;
              console.log(this.order);

        });
      });
    }

  }

}

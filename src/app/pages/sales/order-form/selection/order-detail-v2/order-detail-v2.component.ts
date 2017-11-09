import { GlobalService } from '../../../../../@core/data/services/global/global.service';
import { DetailService } from '../../../../../@core/data/services/sales/order/detail.service';
import { SalesOrder } from './../../../../../@core/models/sales-order';
import { OrderDetailList } from './../../../../../@core/models/order-detail';
import { ActivatedRoute, Router } from '@angular/router';
import { DataTableResource } from 'angular-4-data-table';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'ngx-order-detail-v2',
  templateUrl: './order-detail-v2.component.html',
  styleUrls: ['./order-detail-v2.component.scss']
})
export class OrderDetailV2Component implements OnInit, OnDestroy {

  orderdetails: OrderDetailList;
  subscription: Subscription;
  tableResource: DataTableResource<OrderDetailList>;
  items: OrderDetailList[] = [];
  itemCount: number;
  @Input('master') masterName: string;
  @Input('sonumber') soNumber: string;
  @Input('salesorder') salesorder: SalesOrder[] = [];
  message: any;

  constructor(private orderdetailList: DetailService,
    private router: Router,
    private route: ActivatedRoute,
    private globalservice: GlobalService ) {

      // subscribe to global services
      this.subscription = this.globalservice.getMessage().subscribe(m => { this.message = m; });
      this.subscription = this.globalservice.getOrderDetails().subscribe(m => {
        this.orderdetailList.get(m).subscribe(o => {
          this.orderdetails = o;
          this.initializeTable(o);
        });
      });


    }

  private initializeTable(orderdetailList: OrderDetailList[]) {
    this.tableResource = new DataTableResource(orderdetailList);
    this.tableResource.query({ offset: 0 })
      .then(items => this.items = items);
    this.tableResource.count()
      .then(count => this.itemCount = count);
  }

  reloadItems(params) {
    console.log(params);
    if (!this.tableResource) { return; }
    console.log('after');
    this.tableResource.query(params)
      .then(items => this.items = items);
  }

  remove(item) {
    console.log(item);
    this.orderdetailList.delete(item.SODetailsID).subscribe();
    // this.router.navigate(['/sales-order', item]);
  }

  save(item) {
    console.log('order Discount ' + item.Discount  + 'sales order id: ' + item.$id);
  }

  ngOnInit() {
    this.route.paramMap
    .subscribe(params => {
      const id = params.get('id');
      console.log(id);
      this.subscription = this.orderdetailList.get(id)
      .subscribe(orders => {
        this.orderdetails = orders;
        this.initializeTable(orders);
      });
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}

import { Component, Input, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataTableResource } from 'angular-4-data-table';
import { Subscription } from 'rxjs/Subscription';

import { GlobalService } from '../../../../../@core/data/services/global/global.service';
import { DetailService } from '../../../../../@core/data/services/sales/order/detail.service';
import { SharedOrderService } from './../../../../../@core/data/services/shared/sales/shared-order.service';
import { OrderDetailList } from './../../../../../@core/models/order-detail';
import { SalesOrder } from './../../../../../@core/models/sales-order';

@Component({
  selector: 'ngx-order-detail-v2',
  templateUrl: './order-detail-v2.component.html',
  styleUrls: ['./order-detail-v2.component.scss']
})
export class OrderDetailV2Component implements OnInit, OnDestroy, OnChanges {
  orderdetails: OrderDetailList[] = [];
  subscription: Subscription;
  tableResource: DataTableResource<OrderDetailList>;
  items: OrderDetailList[] = [];
  itemCount: number;
  @Input('master') masterName: string;
  @Input('soid') soid: string;
  @Input('salesorder') salesorder: SalesOrder[] = [];
  message: any;

  constructor(private orderdetailList: DetailService,
    private router: Router,
    private route: ActivatedRoute,
    private sharedOrderService: SharedOrderService,
    private globalservice: GlobalService ) { }

  private initializeTable(orderdetailList: OrderDetailList[]) {
    this.tableResource = new DataTableResource(orderdetailList);
    this.tableResource.query({ offset: 0 })
      .then(items => this.items = items);
    this.tableResource.count()
      .then(count => this.itemCount = count);
  }

  reloadItems(params) {
    // console.log(params);
    if (!this.tableResource) { return; }
    this.tableResource.query(params)
      .then(items => this.items = items);
    this.update();
  }

  // remove order
  remove(item) {
    this.orderdetailList.delete(item.SODetailsID).subscribe(r => {
      this.update() 
    });
  }

  // include a discount
  save(item) {
    console.log('order Discount ' + item.Discount  + 'sales order id: ' + item.$id);
    this.update();
  }

  update() {
    this.sharedOrderService.getOrders(this.soid);
  }


  fetchData(id) {
    this.subscription = this.sharedOrderService.navItem$
    .subscribe(
      i => {
        this.orderdetails = i;
        this.initializeTable(i);
        // console.log(i)
      }
    )
  }

  ngOnChanges() {
  }

  // initialize
  ngOnInit() {
    this.fetchData(this.soid);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}

import { DetailService } from '../../sales/order/detail.service';
import { OrderDetailList } from './../../../../models/order-detail';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Injectable } from '@angular/core';

@Injectable()
export class SharedOrderService {
  // orderdetails: OrderDetailList;

  // Observable navItem source
  // Return type of orderlist in BehaviorSubject
  private _orderItemSource = new BehaviorSubject<OrderDetailList[]>([]);

  // Observable navItem stream
  // Observable of orderlist
  navItem$ = this._orderItemSource.asObservable();

  constructor(private orderdetailList: DetailService) { }

  getOrders(id) {
    console.log(this.navItem$);
    this.orderdetailList.get(id)
    .subscribe(orders => {
      // console.log(orders);
      this._orderItemSource.next(orders);
      // console.log(this.orderdetails);
      // return this.orderdetails;
    });
  }

  // return a new record of orderlist
  // changeNav(orders: OrderDetailList[]) {
  //   this._orderItemSource.next(orders);
  //   console.log("Inside changeNav", orders )
  // }

}

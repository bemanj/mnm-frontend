import { InventoryList } from './../../../../models/inventory';
import { InventoryService } from './../../inventory/inventory.service';
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
  // Return type of inventorylist 
  private _inventorySource = new BehaviorSubject<InventoryList[]>([]);

  // Observable navItem stream
  // Observable of orderlist
  navItem$ = this._orderItemSource.asObservable();
  // Observable of inventorylist
  navInventory$ = this._inventorySource.asObservable();

  constructor(private orderdetailList: DetailService,
              private inventoryList: InventoryService) { }

  // fetch orders              
  getOrders(id) {
    // console.log(this.navItem$);
    this.orderdetailList.get(id)
    .subscribe(orders => {
      this._orderItemSource.next(orders);
    });
  }

    // fetch inventory              
    getInventory() {
      // console.log(this.navItem$);
      this.inventoryList.getAll()
      .subscribe(i => {
        this._inventorySource.next(i);
      });
    }

}

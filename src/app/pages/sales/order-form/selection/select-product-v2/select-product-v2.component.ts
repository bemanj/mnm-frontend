import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataTableResource } from 'angular-4-data-table';
import { Subscription } from 'rxjs/Subscription';

import { InventoryService } from '../../../../../@core/data/services/inventory/inventory.service';
import { GlobalService } from './../../../../../@core/data/services/global/global.service';
import { DetailService } from './../../../../../@core/data/services/sales/order/detail.service';
import { SharedOrderService } from './../../../../../@core/data/services/shared/sales/shared-order.service';
import { InventoryList } from './../../../../../@core/models/inventory';

@Component({
  selector: 'ngx-select-product-v2',
  templateUrl: './select-product-v2.component.html',
  styleUrls: ['./select-product-v2.component.scss']
})
export class SelectProductV2Component implements OnInit {
  inventory: InventoryList;
  subscription: Subscription;
  tableResource: DataTableResource<InventoryList>;
  items: InventoryList[] = [];
  itemCount: number;
  order;
  data;
  @Input('master') masterName: string;
  @Input('soid') soid: string;
  postData$;
  message: string;

  constructor(private inventoryList: InventoryService,
    private orderdetailService: DetailService,
    private route: ActivatedRoute,
    private router: Router,
    private globalservice: GlobalService,
    private sharedOrderService: SharedOrderService,) {

  }

  private initializeTable(inventoryList: InventoryList[]) {
    this.tableResource = new DataTableResource(inventoryList);
    this.tableResource.query({ offset: 0 })
      .then(items => this.items = items);
    this.tableResource.count()
      .then(count => this.itemCount = count);
  }

  reloadItems(params) {
    if (!this.tableResource) return;

    this.tableResource.query(params)
      .then(items => this.items = items);    
  }

  save(item) {
    // reference salesorderid
    let id = this.soid;
    // validate quantity
    if (item.OrderQuantity > 0 && !isNaN(item.OrderQuantity)) {
      // computation
      const totalAmount = item.Price * item.OrderQuantity;
      // build json 
      const postdata = {
          SalesOrderID: this.soid
          , StockId: item.StockId
          , SalesOrderNumber: 'SO' + this.soid
          , ProductId: item.ProductId
          , UnitPrice: item.Price
          , Article: item.Article
          , UOM: item.UOM
          , Quantity: item.OrderQuantity
          , Discount: 0
          , TotalAmount: totalAmount
        }
        // add to orders
        this.orderdetailService.create(postdata).subscribe(data => { 
          this.postData$ = data
          this.fetchData(this.soid);
        });
    } else {
      alert('Invalid quantity :' + item.OrderQuantity);
    }
  }

  // testing component communications
  sendMessage(): void {
      this.globalservice.sendMessage('Message from Select order to Orders component')
  }

  clearMessage(): void {
    this.globalservice.clearMessage();
  }

  getSelectedComponents() {
  } 

  // get new record from service
  fetchData(id) {
    this.sharedOrderService.getOrders(id);
  }

  ngOnInit() {
    // return all records on initial load
    this.subscription = this.inventoryList.getAll()
    .subscribe(inventory => {
      this.inventory = inventory;
      this.initializeTable(inventory);
    });

  }
  
  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}

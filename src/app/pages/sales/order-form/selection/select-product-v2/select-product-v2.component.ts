import { SharedOrderService } from './../../../../../@core/data/services/shared/sales/shared-order.service';
import { GlobalService } from './../../../../../@core/data/services/global/global.service';
import { DetailService } from './../../../../../@core/data/services/sales/order/detail.service';
import { InventoryService } from '../../../../../@core/data/services/inventory/inventory.service';
import { InventoryList } from './../../../../../@core/models/inventory';
import { ActivatedRoute, Router } from '@angular/router';
import { DataTableResource } from 'angular-4-data-table';
import { Component, OnInit, Input} from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

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
  private totalAmount = 0;
  postData$;
  message: string;

  constructor(private inventoryList: InventoryService,
    private orderdetailService: DetailService,
    private route: ActivatedRoute,
    private router: Router,
    private globalservice: GlobalService,
    private sharedOrderService: SharedOrderService,
  ) { 

      
    this.subscription = this.inventoryList.getAll()
    .subscribe(inventory => {
      this.inventory = inventory;
      this.initializeTable(inventory);
    });
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

    
    if (item.OrderQuantity > 0 && !isNaN(item.OrderQuantity)) {
      
      var postdata;
      // console.log('Amount :' + item.Price * item.OrderQuantity);
      // this.route.paramMap
      // .subscribe(params => {
        let id = this.soid;

        this.totalAmount = item.Price * item.OrderQuantity;

        postdata = {
          SalesOrderID: id
          , StockId: item.StockId
          , SalesOrderNumber: 'SO' + id
          , ProductId: item.ProductId
          , UnitPrice: item.Price
          , Article: item.Article
          , UOM: item.UOM
          , Quantity: item.OrderQuantity
          , Discount: 0
          , TotalAmount: this.totalAmount
        }

        // add to orders
        this.orderdetailService.create(postdata).subscribe(data => { 
          this.postData$ = data
          this.fetchData(id);
        });
        
        console.log(id);
        // this.sendMessage();
      // });

     
      
      // this.router.navigate(['/order-detail']);

    }
    else{
      alert('Invalid quantity :' + item.OrderQuantity);
    }

    

      
    }

    sendMessage(): void {
      this.globalservice.sendMessage('Message from Select order to Orders component')
    }

    clearMessage(): void {
      this.globalservice.clearMessage();
    }

    getSelectedComponents() {
      // this.sharedMessage.changeNav('any') //dataFromControls is string data..
      // this.dataFromSisterComponent = '';   
    } 

  fetchData(id) {
    this.sharedOrderService.getOrders(id);
    // this.subscription = this.sharedOrderService.navItem$
    // .subscribe(
    //   i => {
    //     this.orderdetails = i;
    //     this.initializeTable(i);
    //     console.log(i)
    //   }
    // )
  }

  ngOnInit() {
  }

  
  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}

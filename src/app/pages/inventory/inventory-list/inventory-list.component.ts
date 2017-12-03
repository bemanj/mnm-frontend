import { InventoryService } from '../../../@core/data/services/inventory/inventory.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';

@Component({
  selector: 'ngx-inventory-list',
  templateUrl: './inventory-list.component.html',
  styles: [`
    nb-card {
      transform: translate3d(0, 0, 0);
    }
  `],
})
export class InventoryListComponent implements OnInit {

  data: any;
  
    settings = {
      actions: false,
      columns: {
        StockId: {
          title: 'Stock #',
          type: 'number',
        },
        CategoryName: {
          title: 'Category',
          type: 'string',
        },
        Article: {
          title: 'Article',
          type: 'string',
        },
        ProductTitle: {
          title: 'Product',
          type: 'string',
        },
        CompanyName: {
          title: 'Supplier',
          type: 'string',
        },
        BrandTitle: {
          title: 'Brand',
          type: 'string',
        },
        available_qty: {
          title: 'Available Quantity',
          type: 'number',
        },
        deficient_qty: {
          title: 'Deficit Quantity',
          type: 'number',
        },
        UOM: {
          title: 'UOM',
          type: 'number',
        },
        Price: {
          title: 'Price',
          valuePrepareFunction: (value) => { return value === 'Total'? value : Intl.NumberFormat('en-US',{style:'currency', currency: 'PHP'}).format(value)}
        },
        AcquisitionPrice: {
          title: 'Acquisition Price',
          valuePrepareFunction: (value) => { return value === 'Total'? value : Intl.NumberFormat('en-US',{style:'currency', currency: 'PHP'}).format(value)}
        },
      },
    };
  
    source: LocalDataSource = new LocalDataSource();

    
  constructor(private router: Router,
              private inventoryList: InventoryService) { }

  ngOnInit() {
    this.inventoryList.getAll()
    .subscribe(s => {
      this.data = s;
      // console.log(this.data);
      this.source.load(this.data);
    });
  }

  save() {
    this.router.navigate(['/pages/inventory/form', '']);
  }

  onUserRowSelect(event): void {
    // Return SalesOrderID
    console.log(event.data.SalesOrderID);
    // Open to Sales Order Form
    // this.router.navigate(['/pages/sales/order', event.data.SalesOrderID]);
    this.router.navigate(['/pages/inventory/form', event.data.StockId]);
  }

}

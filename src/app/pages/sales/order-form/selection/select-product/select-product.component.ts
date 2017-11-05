import { InventoryService } from '../../../../../@core/data/services/inventory/inventory.service';
import { SmartTableService } from './../../../../../@core/data/smart-table.service';
import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';


@Component({
  selector: 'ngx-select-product',
  templateUrl: './select-product.component.html',
  styles: [`
  nb-card {
    transform: translate3d(0, 0, 0);
  }
`],
})
export class SelectProductComponent implements OnInit {

  settings = {
    actions: false,
    columns: {
      StockId: {
        title: 'ID',
        type: 'number',
      },
      CategoryName: {
        title: 'Category',
        type: 'string',
      },
      ProductTitle: {
        title: 'Product',
        type: 'string',
      },
      available_qty: {
        title: 'Quantity',
        type: 'number',
      },
      Price: {
        title: 'Unit Price',
        type: 'number',
      },
      UOM: {
        title: 'UOM',
        type: 'number',
      },
    },
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(private service: SmartTableService,
              private inventoryservice: InventoryService) {
    
  }

  ngOnInit() {
    this.inventoryservice.getAll().subscribe(i => {
      this.source.load(i);
    });
  }
}

import { DetailService } from '../../../../../@core/data/services/sales/order/detail.service';
import { SmartTableService } from './../../../../../@core/data/smart-table.service';
import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';

@Component({
  selector: 'ngx-order-detail',
  templateUrl: './order-detail.component.html',
  styles: [`
  nb-card {
    transform: translate3d(0, 0, 0);
  }
`],
})
export class OrderDetailComponent implements OnInit {

  settings = {
    actions: false,
    columns: {
      ProductTitle: {
        title: 'Product',
        type: 'string',
      },
      UnitPrice: {
        title: 'Unit Price',
        type: 'number',
      },
      UOM: {
        title: 'UOM',
        type: 'string',
      },
      Article: {
        title: 'Article',
        type: 'string',
      },
      Quantity: {
        title: 'QTY',
        type: 'number',
      },
      Discount: {
        title: 'Discount',
        type: 'number',
      },
      TotalAmount: {
        title: 'Sub Amount',
        type: 'number',
      },
    },
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(private service: SmartTableService,
              private sodetailservice: DetailService) {
  }

  ngOnInit() {
    this.sodetailservice.getAll().subscribe(i => {
      this.source.load(i);
    });
  }
}

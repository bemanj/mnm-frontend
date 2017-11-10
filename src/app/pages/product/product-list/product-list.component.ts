import { ProductService } from './../../../@core/data/services/product/product.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';

import { SmartTableService } from '../../../@core/data/smart-table.service';
import { SalesReportService } from './../../../@core/data/services/sales/sales-report.service';


@Component({
  selector: 'ngx-product-list',
  templateUrl: './product-list.component.html',
  styles: [`
  nb-card {
    transform: translate3d(0, 0, 0);
  }
`],
})
export class ProductListComponent implements OnInit {

  data: any;
  
    settings = {
      actions: false,
      columns: {
        ProductId: {
          title: 'ID',
          type: 'number',
        },
        ProductTitle: {
          title: 'Product',
          type: 'string',
        },
        CategoryName: {
          title: 'Category',
          type: 'string',
        },
        ReorderLevel: {
          title: 'Reorder Level',
          type: 'number',
        },
      },
    };
  
    source: LocalDataSource = new LocalDataSource();
  
  constructor(private productservice: ProductService,
              private router: Router
            ) { }

  save() {
    this.router.navigate(['/pages/product/form/']);
  }
  ngOnInit() {
    this.productservice.getAll()
    .subscribe(s => {
      this.data = s;
      // console.log(this.data);
      this.source.load(this.data);
    });
  }

}

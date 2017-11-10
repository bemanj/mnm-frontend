import { ProductCategoryService } from './../../../@core/data/services/product/category/product-category.service';
import { ProductService } from './../../../@core/data/services/product/product.service';
import { Subscription } from 'rxjs/Subscription';
import { DataTableResource } from 'angular-4-data-table';
import 'rxjs/add/operator/take';

import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {
  categories$;
  p = {};
  id;
  testlabel = 'sample' ;

  constructor(private productservice: ProductService,
              private route: ActivatedRoute,
              private productcategoryservice: ProductCategoryService) {
    
    this.id = this.route.snapshot.paramMap.get('id');
    // debugger
    if (this.id) {
      this.productservice.getById(this.id).subscribe(p => {
      this.p  = p;
      console.log(this.p);
      });
    }
  }

  save(p) {
    // alert('test save function');
      alert('Product will be save');

      // console.log('coy ' + p.Company);

      const newproduct = {
        CategoryID: p.category,
        ProductTitle: p.ProductTitle,
        ReorderLevel: p.ReorderLevel,
        Discontinued: p.Discontinued
      };
// debugger
      const updatedproduct = {
        ProductId: this.id,
        CategoryID: p.category,
        ProductTitle: p.ProductTitle,
        ReorderLevel: p.ReorderLevel,
        Discontinued: p.Discontinued
      };

      // console.log(newproduct);
      if (this.id) {
        this.productservice.update(this.id, updatedproduct);
      } else {
        this.productservice.create(newproduct).subscribe();
      }
      // return to previous page
      this.back();
        // create toaster after new product is created
        // console.log('update so' + this.orderHeader.SalesOrderID)
    }

    back() {
      // this.router.navigate(['/sales-order', id]);
      history.back()
    }

    ngOnInit() {
      this.productcategoryservice.getAll().subscribe(c => {
        this.categories$ = c;
      });
    }

}

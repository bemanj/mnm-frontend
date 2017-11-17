import { ActivatedRoute } from '@angular/router';
import { ProductList } from '../../../@core/models/product-lsit';
import { ProductService } from '../../../@core/data/services/product/product.service';
import { Component, OnInit } from '@angular/core';
import { InventoryService } from '../../../@core/data/services/inventory/inventory.service';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-inventory-form',
  templateUrl: './inventory-form.component.html',
  styleUrls: ['./inventory-form.component.scss']
})
export class InventoryFormComponent implements OnInit {
  inventories$;
  inventory = {}; 
  product$: ProductList[];
  id;
  momentValue;

  constructor(private productservice: ProductService,
              private route: ActivatedRoute,
              private router: Router, 
              private inventoryService: InventoryService) { }

  save(inventory) {
    // alert('test save function');
    var date = new Date();
      var invdata = {
        PONumber: inventory.ponumber
        , StockId: inventory.stockid
        , SupplierId: inventory.supplierid
        , ProductId: inventory.productid
        , Brand: inventory.brand
        , Article: inventory.article
        , UOM: inventory.uom
        , Quantity: inventory.quantity
        , Price: inventory.price
        , AcquisitionPrice: inventory.acquisitionprice
        , DateDelivered: date
        , DateDisposed: date
        , ModifiedDate: date
        // , DateDelivered: date
        // , DateDisposed: date
        // , ModifiedDate: date
        , PutAwayLocation: 1
      }

      var invput = {
        id: this.id
        , PONumber: inventory.ponumber
        , StockId: inventory.stockid
        , SupplierId: inventory.supplierid
        , ProductId: inventory.productid
        , Brand: inventory.brand
        , Article: inventory.article
        , UOM: inventory.uom
        , Quantity: inventory.quantity
        , Price: inventory.price
        , AcquisitionPrice: inventory.acquisitionprice
        , DateDelivered: date
        , DateDisposed: date
        , ModifiedDate: date
        // , DateDelivered: date
        // , DateDisposed: date
        // , ModifiedDate: date
        , PutAwayLocation: 1
      }

      // this.inventoryService.create(invdata).subscribe(data => this.inventories$ = data);;
      // console.log(invdata);
      // console.log('id ' + this.id);
        if (this.id) this.inventoryService.update(this.id, invput);
        else this.inventoryService.create(invdata).subscribe(data => this.inventories$ = data);
        this.router.navigate(['/pages/inventory/list']);
      // console.log(this.soNumber$);
    }
              
  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) this.inventoryService.get(this.id).take(1).subscribe(p => this.inventory = p);

    this.productservice.getAll()
    .subscribe(s => {
      this.product$ = s;
    });
  }

}

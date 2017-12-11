import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalDataSource } from 'ng2-smart-table';

import { SupplierService } from '../../../@core/data/services/supplier/supplier.service';

@Component({
  selector: 'ngx-supplier-list',
  templateUrl: './supplier-list.component.html',
  styles: [`
  nb-card {
    transform: translate3d(0, 0, 0);
  }
`],
})
export class SupplierListComponent implements OnInit {
  
  data: any;
  
    settings = {
      actions: false,
      columns: {
        SupplierID: {
          title: 'ID',
          type: 'number',
        },
        CompanyName: {
          title: 'Brand',
          type: 'string',
        },
        ContactName: {
          title: 'Contact',
          type: 'string',
        },
        Phone: {
          title: 'Phone',
          type: 'string',
        },
        Fax: {
          title: 'Fax',
          type: 'string',
        },
        Address: {
          title: 'Address',
          type: 'string',
        },
        City: {
          title: 'City',
          type: 'string',
        },
        Region: {
          title: 'Region',
          type: 'string',
        },
      },
    };
  
    source: LocalDataSource = new LocalDataSource();
  
  constructor(private supplierservice: SupplierService,
              private router: Router
            ) { }

  add() {
    this.router.navigate(['/pages/supplier/form/']);
  }

  onUserRowSelect(event): void {
    // Return Product ID
    console.log(event.data.ProductId);
    // debugger
    // Open to Product Form
    this.router.navigate(['/pages/supplier/form', event.data.SupplierID]);
  }

  ngOnInit() {
    this.supplierservice.getAll()
    .subscribe(s => {
      this.data = s;
      // console.log(this.data);
      this.source.load(this.data);
    });
  }

}

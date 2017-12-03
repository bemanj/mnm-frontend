import { BrandService } from './../../../@core/data/services/brand/brand.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalDataSource } from 'ng2-smart-table';


@Component({
  selector: 'ngx-brand-list',
  templateUrl: './brand-list.component.html',
  styles: [`
  nb-card {
    transform: translate3d(0, 0, 0);
  }
`],
})
export class BrandListComponent implements OnInit {

  data: any;
  
    settings = {
      actions: false,
      columns: {
        id: {
          title: 'ID',
          type: 'number',
        },
        BrandTitle: {
          title: 'Brand',
          type: 'string',
        },
        isActive: {
          title: 'Active',
          type: 'boolean',
        },
      },
    };
  
    source: LocalDataSource = new LocalDataSource();
  
  constructor(private brandservice: BrandService,
              private router: Router
            ) { }

  add() {
    this.router.navigate(['/pages/product/brand/']);
  }

  onUserRowSelect(event): void {
    // Return Product ID
    console.log(event.data.ProductId);
    // debugger
    // Open to Product Form
    this.router.navigate(['/pages/product/brand', event.data.id]);
  }

  ngOnInit() {
    this.brandservice.getAll()
    .subscribe(s => {
      this.data = s;
      // console.log(this.data);
      this.source.load(this.data);
    });
  }

}

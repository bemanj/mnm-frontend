import { ActivatedRoute } from '@angular/router';
import { BrandService } from '../../../@core/data/services/brand/brand.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.scss']
})
export class BrandComponent implements OnInit {
  b = {};
  id;

  constructor(private brandservice: BrandService,
              private route: ActivatedRoute,
  ) {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.brandservice.getById(this.id).subscribe(b => {
      this.b  = b;
      console.log(this.b);
      });
    }
   }

   save(b) {
    // alert('test save function');
      alert('Brand will be save');
      // console.log('coy ' + p.Company);
      const newbrand = {
        BrandTitle: b.BrandTitle,
        isActive: b.isActive,
      };
    // debugger
      const updatedbrand = {
        id: this.id,
        BrandTitle: b.BrandTitle,
        isActive: b.isActive,
      };

      // console.log(newproduct);
      if (this.id) {
        this.brandservice.update(this.id, updatedbrand);
      } else {
        this.brandservice.create(newbrand).subscribe();
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

    delete() {
      var r = confirm("Brand will be deleted");
      if (r == true) {
        this.brandservice.delete(this.id);
        this.back();
      } 
    }

  ngOnInit() {

  }

}

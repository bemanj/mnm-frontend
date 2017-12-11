import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { SupplierService } from '../../../@core/data/services/supplier/supplier.service';

@Component({
  selector: 'app-supplier-form',
  templateUrl: './supplier-form.component.html',
  styleUrls: ['./supplier-form.component.scss']
})
export class SupplierFormComponent implements OnInit {
  s = {};
  id;

  constructor(private supplierservice: SupplierService,
              private route: ActivatedRoute,
  ) {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.supplierservice.getById(this.id).subscribe(s => {
      this.s  = s;
      console.log(this.s);
      });
    }
   }


   save(s) {
    // alert('test save function');
      alert('Supplier will be save');
      // console.log('coy ' + p.Company);
      const newsupplier = {
        CompanyName: s.CompanyName,
        ContactName: s.ContactName,
        ContactTitle: s.ContactTitle,
        Address: s.Address,
        City: s.City,
        Region: s.Region,
        PostalCode: s.PostalCode,
        Country: s.Country,
        Phone: s.Phone,
        Fax: s.Fax,
        HomePage: s.HomePage,
      };
    // debugger
      const updatedsupplier = {
        SupplierID: this.id,
        CompanyName: s.CompanyName,
        ContactName: s.ContactName,
        ContactTitle: s.ContactTitle,
        Address: s.Address,
        City: s.City,
        Region: s.Region,
        PostalCode: s.PostalCode,
        Country: s.Country,
        Phone: s.Phone,
        Fax: s.Fax,
        HomePage: s.HomePage,
      };

      // console.log(newproduct);
      if (this.id) {
        this.supplierservice.update(this.id, updatedsupplier);
      } else {
        this.supplierservice.create(newsupplier).subscribe();
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
      var r = confirm("Supplier will be deleted");
      if (r == true) {
        this.supplierservice.delete(this.id);
        this.back();
      } 
    }

  ngOnInit() {
  }

}

import 'rxjs/add/operator/take';

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { CustomerService } from './../../../@core/data/services/customer/customer.service';

@Component({
  selector: 'ngx-customer-form',
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.scss']
})
export class CustomerFormComponent implements OnInit {
  customer$;
  customerinfo = {}; 
  id;
  momentValue;

  constructor(private customerservice: CustomerService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  save(i) {
    // alert('test save function');
      var data = {
        CustomerID: this.id,
        CompanyName: i.company,
        ContactName: i.person,
        ContactTitle: i.title,
        Address: i.address,
        City: i.city,
        Region: i.region,
        PostalCode: i.postal,
        Country: i.country,
        Phone: i.phone,
        Fax: i.fax,
        Terms: i.terms
      }
      // console.log(invdata);
      // console.log('id ' + this.id);
        if (this.id) this.customerservice.update(this.id, data);
        this.router.navigate(['/pages/customer/list']);
  }

  delete() {
    var r = confirm("Customer will be deleted");
    if (r == true) {
      this.customerservice.delete(this.id);
      this.back();
    } 
  }

  back() {
    history.back()
  }              

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    // debugger
    if (this.id) this.customerservice.get(this.id).take(1).subscribe(p => this.customerinfo = p);
  }

}

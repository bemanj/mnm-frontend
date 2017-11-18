import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-customer-list',
  templateUrl: './customer-list.component.html',
  styles: [`
  nb-card {
    transform: translate3d(0, 0, 0);
  }
`],
})
export class CustomerListComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}

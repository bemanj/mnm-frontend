import { Observable } from 'rxjs/Observable';
import { DetailService } from './../sales/order/detail.service';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
 
@Injectable()
export class GlobalService {
    private subject = new Subject<any>();
    private orderdetail = new Subject<any>();
    private fetchorderdetails: DetailService;

    fetchOrderDetails(id: number) {
      this.orderdetail.next({ data: id });
    }

    getOrderDetails(): Observable<any> {
      return this.orderdetail.asObservable();
    }

    sendMessage(message: string) {
        this.subject.next({ text: message });
    }
 
    clearMessage() {
        this.subject.next();
    }
 
    getMessage(): Observable<any> {
        return this.subject.asObservable();
    }
}
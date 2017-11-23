import { ConfigService } from './../../config/config.service';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';

import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';


@Injectable()
export class DetailService {

  private _url: string;

  constructor(private http: Http,
              private configService: ConfigService) { 
    this._url = configService.getApiURI();
  }

  create(body) {
    console.log(body);
    return this.http.post(this._url + 'SalesOrderDetails/', body)
    .do(this.logResponse)
    .map((res: Response) => res.json());
  }

  getAll() {
    return this.http.get(this._url + 'view_SalesOrderDetails')
     .do(this.logResponse)
     .map((res: Response) => res.json());
  }

  get(id) {
    return this.http.get(this._url + 'SalesOrderDetails/' + id)
    .do(this.logResponse)
    .map((res: Response) => res.json());
  }

  update(id, data) {
    return this.http.put(this._url + 'SalesOrderDetails/' + id, data)
    .do(this.logResponse)
    .map((res: Response) => res.json());
    // .subscribe((res: Response) => res.json());
  }

  delete(inventoryId) {
    return this.http.delete(this._url + 'SalesOrderDetails/' + inventoryId)
    .do(this.logResponse)
    .map((res: Response) => res.json());
  }

  private logResponse(res: Response) {
      console.log(res);
  }

}

import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';

import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { ConfigService } from '../config/config.service';

@Injectable()
export class ProductService {

  private _url: string;

  constructor(private http: Http,
              private configService: ConfigService) { 
    this._url = configService.getApiURI();
  }

  create(body) {
    console.log(body);
    return this.http.post(this._url + 'ProductOnes', body)
    .do(this.logResponse)
    .map((res: Response) => res.json());
  }

  getAll() {
    return this.http.get(this._url + 'ViewProduct')
     .do(this.logResponse)
     .map((res: Response) => res.json());
  }

  getById(pid) {
    return this.http.get(this._url + 'ProductOnes/' + pid)
    .do(this.logResponse)
    .map((res: Response) => res.json());
  }

  private logResponse(res: Response) {
      console.log(res);
  }

  delete(pid) {
    this.http.delete(this._url + 'ProductOnes/' + pid)
    .subscribe((res: Response) => res.json());
  }

  update(pid, pbody) {
    this.http.put(this._url + 'ProductList/' + pid, pbody)
    .subscribe((res: Response) => res.json());
  }
  
}

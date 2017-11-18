import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';

import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { ConfigService } from '../config/config.service';

@Injectable()
export class SupplierService {
  
  private _url: string;
  
  constructor(private http: Http,
              private configService: ConfigService) { 
    this._url = configService.getApiURI();
  }

  create(body) { 
    console.log(body);
    return this.http.post(this._url + 'suppliers', body)
    .do(this.logResponse)
    .map((res: Response) => res.json());
  }

    
  update(id, record) { 
    this.http.put(this._url + 'suppliers/' + id, record)
    .subscribe((res: Response) => res.json());;
  }

  get(id) { 
    return this.http.get(this._url + 'suppliers/' + id)
    .do(this.logResponse)
    .map((res: Response) => res.json());
  }
  
  getAll() {
    return this.http.get(this._url + 'suppliers')
      .do(this.logResponse)
      .map((res: Response) => res.json());
  }


  private logResponse(res: Response) {
    console.log(res);
  }

}

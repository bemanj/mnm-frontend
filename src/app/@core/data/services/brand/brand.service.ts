import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';

import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { ConfigService } from '../config/config.service';

@Injectable()
export class BrandService {
  
  private _url: string;
  
  constructor(private http: Http,
              private configService: ConfigService) { 
    this._url = configService.getApiURI();
  }

  create(body) { 
    console.log(body);
    return this.http.post(this._url + 'brands', body)
    .do(this.logResponse)
    .map((res: Response) => res.json());
  }

    
  update(id, record) { 
    this.http.put(this._url + 'brands/' + id, record)
    .subscribe((res: Response) => res.json());;
  }

  getById(id) { 
    return this.http.get(this._url + 'brands/' + id)
    .do(this.logResponse)
    .map((res: Response) => res.json());
  }
  
  getAll() {
    return this.http.get(this._url + 'brands')
      .do(this.logResponse)
      .map((res: Response) => res.json());
  }

  delete(pid) {
    this.http.delete(this._url + 'brands/' + pid)
    .subscribe((res: Response) => res.json());
  }

  private logResponse(res: Response) {
    console.log(res);
  }

}

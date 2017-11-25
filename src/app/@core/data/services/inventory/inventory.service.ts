import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';

import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { ConfigService } from '../config/config.service';

@Injectable()
export class InventoryService {
  
  private _url: string;
  
  constructor(private http: Http,
              private configService: ConfigService) { 
    this._url = configService.getApiURI();
  }

  create(body) { 
    console.log(body);
    return this.http.post(this._url + 'inventorystocks', body)
    .do(this.logResponse)
    .map((res: Response) => res.json());
  }

    
  update(id, body) { 
    this.http.put(this._url + 'inventorystocks/' + id, body)
    .subscribe((res: Response) => res.json());;
  }

  get(id) { 
    return this.http.get(this._url + 'inventorystocks/' + id)
    .do(this.logResponse)
    .map((res: Response) => res.json());
  }
  
  getAll() {
    return this.http.get(this._url + 'ViewInventory')
      .do(this.logResponse)
      .map((res: Response) => res.json());
  }

  delete(id) {
    this.http.delete(this._url + 'inventorystocks/' + id)
    .subscribe((res: Response) => res.json());
  }

  private logResponse(res: Response) {
    console.log(res);
  }

}

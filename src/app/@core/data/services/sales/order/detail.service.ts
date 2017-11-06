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

  getAll() {
    return this.http.get(this._url + 'view_SalesOrderDetails')
     .do(this.logResponse)
     .map((res: Response) => res.json());
  }

  private logResponse(res: Response) {
      console.log(res);
  }

}

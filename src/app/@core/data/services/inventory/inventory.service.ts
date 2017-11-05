import { ConfigService } from '../config/config.service';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class InventoryService {

  private _url: string;
  
    constructor(private http: Http,
                private configService: ConfigService) { 
      this._url = configService.getApiURI();
    }

}

import { Injectable } from '@angular/core';

@Injectable()
export class ConfigService {

   _apiURI: string;

   constructor() {
    //    this._apiURI = 'http://192.168.1.95/api/';
       this._apiURI = 'http://localhost:50524/api/';
       // this._apiURI = 'http://localhost:5000/api';
       // http://localhost/3MNMSolutions.Web.Api
    }

    getApiURI() {
        return this._apiURI;
    }    
}

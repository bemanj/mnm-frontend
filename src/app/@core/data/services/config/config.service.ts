import { Injectable } from '@angular/core';

@Injectable()
export class ConfigService {

   _apiURI: string;

   constructor() {
    //    this._apiURI = 'http://192.168.1.95/api/';
       this._apiURI = 'http://localhost:50524/api/';
    // http://localhost:50524/
       // this._apiURI = 'http://localhost:5000/api';
       // http://localhost/3MNMSolutions.Web.Api
  // private _url = 'http://localhost):64770/api/' 
  //64770 //57483
  //64770 //57483
  // private _url = 'http://localho3st:50524/api/'
  // ht4tp://192.168.1.95/ 
    }

    getApiURI() {
        return this._apiURI;
    }    
}

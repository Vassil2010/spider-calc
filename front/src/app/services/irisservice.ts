import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
  })
export class IrisService {
    constructor(private http: HttpClient) {
        if (environment.production) {
            this.serverhost = location.protocol + '//' +location.host;
        } else {
            this.serverhost = 'http://localhost:57772/calc/';
        }
    }
    serverhost: string;
    serverlogin: string = '_SYSTEM';
    serverpassword: string = 'SYS';


    get(term: string): any {
        const headers = new HttpHeaders()
        term = term.trim();
        const URL = this.serverhost+term;
        return this.http.get(URL, { headers, responseType: 'json'});
    }
    post(data: any, term: string): any {
        const headers = new HttpHeaders()
        const URL = this.serverhost+ term;
        return this.http.post(URL, data, { headers, responseType: 'json'});
    }
}

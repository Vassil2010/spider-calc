import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
  })
export class IrisService {
    constructor(private http: HttpClient) {
        if (environment.production) {
            this.serverhost = 'https://calc.24dtk.ru/csp/motion-calc/';
        } else {
            this.serverhost = 'http://localhost:57772/calc/';
        }
        
        if (environment.production) {
            this.headers = {
                headers: new HttpHeaders({
                  'Content-Type':  'application/json',
                  'Authorization': 'Basic ' + btoa('motioncalc:motioncalc9990')
                })
              };
            
        } else {
            this.headers = { 
                headers: new HttpHeaders({
                    'Content-Type':  'application/json'
                  })
            };
        }
    }
    serverhost: string;
    headers;

    get(term: string): any {
        const headers = new HttpHeaders()
        term = term.trim();
        const URL = this.serverhost+term;
        return this.http.get(URL,this.headers);
    }
    post(data: any, term: string): any {
        const headers = new HttpHeaders()
        const URL = this.serverhost+ term;
        return this.http.post(URL, data, this.headers);
    }
}

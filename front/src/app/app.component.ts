import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IrisService } from './services/irisservice';
import { ToServer } from './models/toserver';
import { AddServiceOptions} from './models/addServiceOptions';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    providers: [IrisService]
})
export class AppComponent implements OnInit {
    
    constructor(private router: Router) {}
    ngOnInit() {
    console.log("AppComponent");
    console.log(this.router.url);
    }
}

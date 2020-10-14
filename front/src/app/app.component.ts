import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { IrisService } from './services/irisservice';
import { ToServer } from './models/toserver'

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    providers: [IrisService]
})
export class AppComponent implements OnInit {
    
    constructor(private irisService: IrisService) { }
    
    fromStations        :string[];
    selectedFromStation :string;
    toStations          :string[];
    selectedToStation   :string;
    goodsWeight         :number;
    goodsVolume         :number;
    result              :string;

    ngOnInit() {
        this.irisService.get('getFromStation')
            .subscribe(data => {
                
                if ('OK'.indexOf(data.status) !== -1) {
                    this.fromStations = data.data;
                    this.selectedFromStation = data.data[0];
                }
            });
        this.irisService.get('getToStation')
            .subscribe(data => {
                
                if ('OK'.indexOf(data.status) !== -1) {
                    this.toStations = data.data;
                    this.selectedToStation = data.data[0];
                }
            });    
        
    }
    

    getCalc() {
        
        const a = new ToServer;
        a.fromStation   = this.selectedFromStation;
        a.toStation     = this.selectedToStation;
        a.goodsWeight   = this.goodsWeight;
        a.goodsVolume   = this.goodsVolume;
        
            this.irisService.post(a,'getCalc')
                .subscribe(data => {
                    
                    
                    if ('OK'.indexOf(data.status) !== -1) {
                       this.result = data.data.value;
                    } 
                });
        
        
    }
    updateCalc() {
        this.getCalc();
    }
   
}

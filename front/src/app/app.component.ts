import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
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
    
    constructor(private irisService: IrisService) { }
    toServer :ToServer = new ToServer;

    transportTypeOptions: any[];
    fromStations        :string[];
    toStations          :string[];
    result              :string;

    addServices:AddServiceOptions[] = [];
   
    ngOnInit() {
        this.transportTypeOptions = [
            {label: 'Море', value: 'sea'}, {label: 'Авиа', value: 'avia'}
        ];
        this.irisService.get('getFromStation')
            .subscribe(data => {
                
                if ('OK'.indexOf(data.status) !== -1) {
                    this.fromStations = data.data;
                    this.toServer.fromStation = data.data[0];
                }
            });
        this.irisService.get('getToStation')
            .subscribe(data => {
                
                if ('OK'.indexOf(data.status) !== -1) {
                    this.toStations = data.data;
                    this.toServer.toStation = data.data[0];
                }
            });  
        this.irisService.get('getAddServices')
            .subscribe(data => {
                if ('OK'.indexOf(data.status) !== -1) {
                    this.addServices = data.data;
                    if (data.data.AddServicesIsAlways) { 
                        data.data.AddServicesIsAlways.forEach(function(item) {
                          
                            if (this.toServer.dop.indexOf(item.label)==-1) {
                                this.toServer.dop.push(item.label);
                            }
                        },this);
                   }
                }
            });   
        
    }
    

    getCalc() {
            this.irisService.post(this.toServer,'getCalc')
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

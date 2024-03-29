import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IrisService } from './services/irisservice';
import { ToServer } from './models/toserver';
import { AddServiceOptions} from './models/addServiceOptions';


@Component({
    selector: 'app-rootV1',
    templateUrl: './app.componentV1.html',
    styleUrls: ['./app.componentV1.css'],
    providers: [IrisService]
})
export class AppComponentV1 implements OnInit {
    
    constructor(private irisService: IrisService, private router: Router) {
     }
    toServer :ToServer = new ToServer;

    transportTypeOptions: any[];
    goodsTypeOptions: any[];
    fromStations        :string[];
    toStations          :string[];
    result              :string;

    addServices:AddServiceOptions[] = [];

    goodsVolumeDisabled = false;
    goodsDimensionsParaDisabled = false;
   
    ngOnInit() {
        console.log("AppComponentV1");
        console.log(this.router.url);
        this.transportTypeOptions = [
            {label: 'Море', value: 'sea'}, {label: 'Авиа', value: 'avia'}
        ];
        this.goodsTypeOptions = [
            {label: 'Обычный', value: 'general'}, 
            {label: 'Социальный груз', value: 'social'},
            {label: 'Продукты (море, тепло)', value: 'product'}
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
        this.updateControls();
        this.getCalc();
    }
    updateControls() {
        if ((this.toServer.goodsVolume!=null)||(this.toServer.goodsVolume>0)) {   
            this.goodsDimensionsParaDisabled = true;
        } 
        
        if ((this.toServer.goodsHeight) && (this.toServer.goodsLength) && (this.toServer.goodsWidth)) {
            this.goodsVolumeDisabled = true;
        }
        if ((this.toServer.goodsHeight==null) && (this.toServer.goodsLength==null) && (this.toServer.goodsWidth==null) && (this.toServer.goodsVolume==null)) {
            this.goodsVolumeDisabled = false;
            this.goodsDimensionsParaDisabled = false;
        }
    }
   
}

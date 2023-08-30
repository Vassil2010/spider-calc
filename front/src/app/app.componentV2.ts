import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { IrisService } from './services/irisservice';
import { ToServer } from './models/toserver';
import { AddServiceOptions} from './models/addServiceOptions';

@Component({
    selector: 'app-rootV2',
    templateUrl: './app.componentV2.html',
    styleUrls: ['./app.componentV2.css'],
    providers: [IrisService]
})
export class AppComponentV2 implements OnInit {
    
    constructor(private irisService: IrisService) {   }
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
                    this.toServer.toStation = data.data.find(e=>e.value === 'Норильск (склад)');
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
    updateCalc(event?,target?) {
        if (target == 'goodsType') {
            this.toServer.goodsType = event.value.value;
        }
        console.log(event);
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

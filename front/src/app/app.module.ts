import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { StepsModule } from 'primeng/steps';
import { ToastModule } from 'primeng/toast';
import { CardModule } from 'primeng/card';
import { CheckboxModule } from 'primeng/checkbox';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import {SelectButtonModule} from 'primeng/selectbutton';
import {TooltipModule} from 'primeng/tooltip';

import { AppComponent } from './app.component';
import { AppComponentV1 } from './app.componentV1';
import { AppComponentV2 } from './app.componentV2';

// определение маршрутов
const appRoutes: Routes =[
    { path: '', component: AppComponentV1},
    { path: 'calc/ver2', component: AppComponentV2},
    { path: 'calc/ver1', component: AppComponentV1 },
    { path: '**', component: AppComponentV1},
];

@NgModule({
    declarations: [
        AppComponent,
        AppComponentV1,
        AppComponentV2
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        TableModule,
        HttpClientModule,
        InputTextModule,
        DialogModule,
        ButtonModule,
        StepsModule,
        ToastModule,
        CardModule,
        CheckboxModule,
        DropdownModule,
        InputNumberModule,
        SelectButtonModule,
        TooltipModule,
        RouterModule.forRoot(appRoutes)
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }

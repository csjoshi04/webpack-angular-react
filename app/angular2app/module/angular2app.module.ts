import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { BrowserModule }  from '@angular/platform-browser';
import { AppComponent } from '../component/app.component';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule
    ],
    declarations: [
        AppComponent
    ],
    bootstrap: [ AppComponent ]
})
export class AppModule { }

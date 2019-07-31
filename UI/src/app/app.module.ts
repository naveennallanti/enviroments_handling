import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// import {  HttpClient } from '@angular/common/http';
// import {Http} from '@angular/http';
import { HttpClientModule } from '@angular/common/http'; 
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule 
    // HttpClient
    // Http
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

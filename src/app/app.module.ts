import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './COMPONENTS/login/login.component';
import { HomeComponent } from './COMPONENTS/home/home.component';
import { DishComponent } from './COMPONENTS/dish/dish.component';
import { HeaderComponent } from './COMPONENTS/header/header.component';
//Providers

import {JwtHelperService, JWT_OPTIONS} from '@auth0/angular-jwt';
import { TestLogComponent } from './COMPONENTS/test-log/test-log.component';
import { MenuDishComponent } from './COMPONENTS/home/menu-dish/menu-dish.component'

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    DishComponent,
    HeaderComponent,
    TestLogComponent,
    MenuDishComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
  {provide:JWT_OPTIONS,useValue:JWT_OPTIONS},
  JwtHelperService],
  bootstrap: [AppComponent]
})
export class AppModule { }

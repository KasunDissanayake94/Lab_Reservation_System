import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {RouterModule, Router, Routes} from '@angular/router'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CalendarModule } from 'angular-calendar';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { AngularDateTimePickerModule } from 'angular2-datetimepicker';

import { AppComponent } from './app.component';
import { SlidebarComponent } from './slidebar/slidebar.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ReservationComponent } from './reservation/reservation.component';

const applicationRouters:Routes = [
  {path:'login',component:LoginComponent},
  {path:'register',component:RegisterComponent},
  {path:'reservation',component:ReservationComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    SlidebarComponent,
    LoginComponent,
    RegisterComponent,
    NavbarComponent,
    ReservationComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(applicationRouters),
    BrowserAnimationsModule, CalendarModule.forRoot(),
    NgbModule.forRoot(),
    AngularDateTimePickerModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

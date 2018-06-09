import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {RouterModule, Router, Routes} from '@angular/router'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CalendarModule } from 'angular-calendar';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { AngularDateTimePickerModule } from 'angular2-datetimepicker';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';

import { AppComponent } from './app.component';
import { SlidebarComponent } from './slidebar/slidebar.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ReservationComponent } from './reservation/reservation.component';
import { ManageusersComponent } from './manageusers/manageusers.component';
import { UserComponent } from './user/user.component';
import { RequestsComponent } from './requests/requests.component';
import { ChecklabsComponent } from './checklabs/checklabs.component';
import { ManagelabsComponent } from './managelabs/managelabs.component';
//Table Edit
//import { EditableTableModule } from 'ng-editable-table/editable-table/editable-table.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';
//Toast
import {ToastModule} from 'ng2-toastr/ng2-toastr';
import { FlashMessagesModule } from 'angular2-flash-messages';

//Import services
import { AuthService } from './service/auth.service';
import { HomeComponent } from './home/home.component';

const applicationRouters:Routes = [
  {path:'',component:HomeComponent},
  {path:'login',component:LoginComponent},
  {path:'register',component:RegisterComponent},
  {path:'reservation',component:ReservationComponent},
  {path:'manageusers',component:ManageusersComponent},
  {path:'user',component:UserComponent},
  {path:'requests',component:RequestsComponent},
  {path:'checklabs',component:ChecklabsComponent},
  {path:'managelabs',component:ManagelabsComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    SlidebarComponent,
    LoginComponent,
    RegisterComponent,
    NavbarComponent,
    ReservationComponent,
    ManageusersComponent,
    UserComponent,
    RequestsComponent,
    ChecklabsComponent,
    ManagelabsComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(applicationRouters),
    BrowserAnimationsModule, CalendarModule.forRoot(),
    NgbModule.forRoot(),
    ToastModule.forRoot(),
    FlashMessagesModule.forRoot(),
    AngularDateTimePickerModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    Ng2SmartTableModule,
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }

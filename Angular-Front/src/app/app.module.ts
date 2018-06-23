import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {RouterModule, Router, Routes} from '@angular/router'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { AngularDateTimePickerModule } from 'angular2-datetimepicker';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';

import { AppComponent } from './app.component';
import { SlidebarComponent } from './slidebar/slidebar.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ManageusersComponent } from './manageusers/manageusers.component';
import { UserComponent } from './user/user.component';
import { RequestsComponent } from './requests/requests.component';
import { ChecklabsComponent } from './checklabs/checklabs.component';
import { DashboardComponent } from './dashboard/dashboard.component';
//Table Edit
//import { EditableTableModule } from 'ng-editable-table/editable-table/editable-table.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';
//Toast
import {ToastModule} from 'ng2-toastr/ng2-toastr';
import { FlashMessagesModule } from 'angular2-flash-messages';

//Import services
import { AuthService } from './service/auth.service';
import { AuthGuard } from './service/auth.guard';
import { HomeComponent } from './home/home.component';
import { MreservationsComponent } from './mreservations/mreservations.component';
import { SreservationsComponent } from './sreservations/sreservations.component';
import { ReportsComponent } from './reports/reports.component';
import { VreservationsComponent } from './vreservations/vreservations.component';

//Calander
import { CalendarModule } from 'angular-calendar';



const applicationRouters:Routes = [
  {path:'',component:HomeComponent},
  {path:'login',component:LoginComponent},
  {path:'register',component:RegisterComponent},
  {path:'manageusers',component:ManageusersComponent,canActivate:[AuthGuard]},
  {path:'user',component:UserComponent,canActivate:[AuthGuard]},
  {path:'requests',component:RequestsComponent,canActivate:[AuthGuard]},
  {path:'mreservations',component:MreservationsComponent,canActivate:[AuthGuard]},
  {path:'sreservations',component:SreservationsComponent,canActivate:[AuthGuard]},
  {path:'reports',component:ReportsComponent,canActivate:[AuthGuard]},
  {path:'dashboard',component:DashboardComponent,canActivate:[AuthGuard]},
  {path:'vreservations',component:VreservationsComponent,canActivate:[AuthGuard]},
];

@NgModule({
  declarations: [
    AppComponent,
    SlidebarComponent,
    LoginComponent,
    RegisterComponent,
    NavbarComponent,
    ManageusersComponent,
    UserComponent,
    RequestsComponent,
    ChecklabsComponent,
    HomeComponent,
    MreservationsComponent,
    SreservationsComponent,
    ReportsComponent,
    DashboardComponent,
    VreservationsComponent,

  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(applicationRouters),
    BrowserAnimationsModule,
    NgbModule.forRoot(),
    ToastModule.forRoot(),
    CalendarModule.forRoot(),
    FlashMessagesModule.forRoot(),
    AngularDateTimePickerModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    Ng2SmartTableModule,
  ],
  providers: [AuthService,AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }

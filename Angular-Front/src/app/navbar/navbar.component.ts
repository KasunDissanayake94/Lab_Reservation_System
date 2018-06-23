import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../service/auth.service";
import {FlashMessage} from "angular2-flash-messages/module/flash-message";
import {FlashMessagesService} from "angular2-flash-messages";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private router : Router , private auth:AuthService,private _flashMessagesService : FlashMessagesService) { }

  ngOnInit() {
  }

  logoutuser() {
    this.auth.logout();
    this._flashMessagesService.show("You're Logged out", { cssClass: 'alert-danger', timeout: 5000});
    return false;

  }
}

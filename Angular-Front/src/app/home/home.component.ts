import { Component, OnInit } from '@angular/core';
import {AuthGuard} from "../service/auth.guard";
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor( private authGuard : AuthGuard , private router :Router) {
    if(authGuard.canActivate){
      router.navigate(['dashboard']);
    }
  }
  ngOnInit() {

  }

}

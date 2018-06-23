import { Component, OnInit } from '@angular/core';
import { Ng2SmartTableModule, LocalDataSource } from 'ng2-smart-table';
import {FlashMessagesService} from "angular2-flash-messages";
import {Router} from "@angular/router";
import {AuthService} from "../service/auth.service";
@Component({
  selector: 'app-manageusers',
  templateUrl: './manageusers.component.html',
  styleUrls: ['./manageusers.component.css']
})
export class ManageusersComponent implements OnInit {
  private dataset: any;
  display = 'none';
  display2 = 'none';

    constructor(private authService : AuthService,private router: Router,private _flashMessagesService: FlashMessagesService) {
    this.authService.search_all_users().subscribe(res=>{
      if(res.state == true){
        this.dataset = res.users;
      }else if(res.state == false){
        console.log("No response here");
      }
    });
  }

  ngOnInit() {

  }

  edituser() {
    this.display="block";
    this.display2="block";
  }

  deleteuser() {
    this.display2="block";
  }

  clsAssigned() {
    this.display="none";
  }
}

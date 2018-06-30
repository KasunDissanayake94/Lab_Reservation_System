import { Component, OnInit } from '@angular/core';
import { Ng2SmartTableModule, LocalDataSource } from 'ng2-smart-table';
import {FlashMessagesService} from "angular2-flash-messages";
import {Router} from "@angular/router";
import {AuthService} from "../service/auth.service";
import {delay} from "rxjs/operators";
@Component({
  selector: 'app-manageusers',
  templateUrl: './manageusers.component.html',
  styleUrls: ['./manageusers.component.css']
})
export class ManageusersComponent implements OnInit {
  private dataset: any;
  display = 'none';
  display2 = 'none';
  display3 = 'none';

  user = {
    name: '',
    username: '',
    email: '',
    password: '',
    confirmpassword: '',
    type :''

  };



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

  edituser(name,username,email,password,type) {
    this.display="block";
    this.user.name = name;
    this.user.username = username;
    this.user.email = email;
    this.user.type = type;

  }

  deleteuser(name,username,email,password,type) {
    this.display2="block";
    this.user.name = name;
    this.user.username = username;
    this.user.email = email;
    this.user.type = type;
  }

  clsAssigned() {
    this.display="none";
    this.display2="none";
    this.display3="none";
  }
  DeleteUserData(){
    this.display2="none";
    this.authService.deleteuser(this.user).subscribe(res=>{
      if(res.state == true){
        this._flashMessagesService.show('Delete Successfully!', { cssClass: 'alert-success', timeout: 5000 });
      }else if(res.state == false){
        this._flashMessagesService.show('Failed to Delete!', { cssClass: 'alert-danger', timeout: 5000});
      }
    });
  }

  EditUserData() {
    this.display="none";
    if(this.user.password == '' || this.user.confirmpassword == '' || this.user.name == '' || this.user.username == '' || this.user.email == '' || this.user.type == ''){
      this._flashMessagesService.show('Fill all the Fields!', { cssClass: 'alert-danger', timeout: 2000});
      setTimeout(()=>{ this.display = "block" }, 2000);
    }else{
      if(this.user.password != this.user.confirmpassword){
        this._flashMessagesService.show('Please enter same password!', { cssClass: 'alert-danger', timeout: 2000});
        setTimeout(()=>{ this.display = "block" }, 2000);
      }else{
        this.authService.edituser(this.user).subscribe(res=>{
          if(res.state == true){
            this._flashMessagesService.show('Update User Deatils Successfully!', { cssClass: 'alert-success', timeout: 5000 });
          }else if(res.state == false){
            this._flashMessagesService.show('Failed to update user Deatils!', { cssClass: 'alert-danger', timeout: 5000});
          }
        });
      }
    }
  }

  adduser(name,username,email,password,type) {
    this.display3="block";
    this.user.name = name;
    this.user.username = username;
    this.user.email = email;
    this.user.password = password;
    this.user.type = type;
    console.log(this.user);
  }

  AddUserData() {
    this.display3="none";
    if(this.user.password == '' || this.user.confirmpassword == '' || this.user.name == '' || this.user.username == '' || this.user.email == '' || this.user.type == ''){
      this._flashMessagesService.show('Fill all the Fields!', { cssClass: 'alert-danger', timeout: 2000});
      setTimeout(()=>{ this.display = "block" }, 2000);
    }else{
      if(this.user.password != this.user.confirmpassword){
        this._flashMessagesService.show('Please enter same password!', { cssClass: 'alert-danger', timeout: 2000});
        setTimeout(()=>{ this.display = "block" }, 2000);
      }else{
        this.authService.registerUser(this.user).subscribe(res=>{
          if(res.state == true){
            this._flashMessagesService.show('User Added Successfully!', { cssClass: 'alert-success', timeout: 5000 });
          }else if(res.state == false){
            this._flashMessagesService.show('Failed to Add User!', { cssClass: 'alert-danger', timeout: 5000});
          }
        });
      }
    }
  }
}

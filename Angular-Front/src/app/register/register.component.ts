import {Component, OnInit, ViewContainerRef} from '@angular/core';
import { AuthService } from '../service/auth.service'
import { FlashMessagesService } from 'angular2-flash-messages';
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {
  private name: any;
  private username: any;
  private email: any;
  private password: any;

  constructor(private authService : AuthService,private router: Router,private _flashMessagesService: FlashMessagesService) {
  }

  registerData(){
    const user ={
      name : this.name,
      username : this.username,
      email : this.email,
      password : this.password
    }

    this.authService.registerUser(user).subscribe(res=>{
      if(res.state == true){
        this._flashMessagesService.show('User Registered Successfully!', { cssClass: 'alert-success', timeout: 5000 });
      }else if(res.state == false){
        this._flashMessagesService.show('Failed to Register!', { cssClass: 'alert-danger', timeout: 5000});
      }
    });
  }

  ngOnInit() {
  }




}

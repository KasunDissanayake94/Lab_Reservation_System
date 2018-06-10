import { Component, OnInit } from '@angular/core';
import {AuthService} from "../service/auth.service";
import {Router} from "@angular/router";
import {FlashMessagesService} from "angular2-flash-messages";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private email: any;
  private password: any;

  constructor(private authService : AuthService,private router: Router,private _flashMessagesService: FlashMessagesService) { }
  login(){
    const userdetails ={
      email : this.email,
      password : this.password
    }
    this.authService.logginuser(userdetails).subscribe(res=>{
      console.log(res);
      if(res.state == true){
        this.router.navigate(['dashboard']);
        this._flashMessagesService.show('Logged in Successfully!', { cssClass: 'alert-success', timeout: 3000 });

      }else if(res.state == false){
        this._flashMessagesService.show('Invalid username or password!', { cssClass: 'alert-danger', timeout: 3000});
        this.router.navigate(['login']);
      }
    });

  }

  ngOnInit() {
  }

}

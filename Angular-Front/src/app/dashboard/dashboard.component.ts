import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  user : any;

  constructor(private authService : AuthService) { }

  ngOnInit() {

    this.authService.getProfile().subscribe(res=>{
      console.log("here");
      console.log(res);
      this.user = res.user;

    })
  }

}

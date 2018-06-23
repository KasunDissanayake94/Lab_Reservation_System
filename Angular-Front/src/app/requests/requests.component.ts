import { Component, OnInit } from '@angular/core';
import {AuthService} from "../service/auth.service";
import {FlashMessagesService} from "angular2-flash-messages";
import {Router} from "@angular/router";

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.css']
})
export class RequestsComponent implements OnInit {
  private dataset1: any;
  solved = {
    date: '',
    start_time: '',
    lab: '',
  }

  constructor(private authService : AuthService,private router: Router,private _flashMessagesService: FlashMessagesService) {
    this.authService.search_all_requests().subscribe(res=>{
      if(res.state == true){
        this.dataset1 = res.requests;
      }else if(res.state == false){
        console.log("No response here");
      }
    });
  }

  ngOnInit() {
  }
  solve(date,time,lab){
    this.solved.date = date;
    this.solved.start_time = time;
    this.solved.lab = lab;
    this.authService.solve_requests(this.solved).subscribe(res=>{
      if(res.state == true){
        this._flashMessagesService.show('Request solved Successfully!', { cssClass: 'alert-success', timeout: 5000 });
      }else if(res.state == false){
        this._flashMessagesService.show('Process Failed!', { cssClass: 'alert-danger', timeout: 5000 });
      }
    });

  }


}

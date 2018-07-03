import { Component, OnInit } from '@angular/core';
import {AuthService} from "../service/auth.service";
import {type} from "os";
import {count} from "rxjs/operators";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})


export class UserComponent implements OnInit {
  username = '';
  dataset :any;
  count =0;
  private display: string;
  private counting: number;

  constructor(private auth :AuthService) {
    this.username = auth.getname();
    this.auth.serach_all_solve_requests().subscribe(res=>{
      if(res.state == true){
        this.dataset = res.solve;
        this.counting = 0;
        for(let x of res.solve){
          if(x.request_by == auth.getname()){
            this.counting = this.counting +1;
          }
        }
        this.count = this.counting;
      }else if(res.state == false){
      }
    });
  }

  ngOnInit() {
  }
  clsAssigned() {
    this.display="none";

  }

  viewNotifications() {
    this.display="block";
  }
}

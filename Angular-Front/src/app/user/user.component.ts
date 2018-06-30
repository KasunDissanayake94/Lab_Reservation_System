import { Component, OnInit } from '@angular/core';
import {AuthService} from "../service/auth.service";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor(private auth :AuthService) { }

  ngOnInit() {
  }

}

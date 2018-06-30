import { Component, OnInit } from '@angular/core';
import {AuthService} from "../service/auth.service";

@Component({
  selector: 'app-slidebar',
  templateUrl: './slidebar.component.html',
  styleUrls: ['./slidebar.component.css']
})
export class SlidebarComponent implements OnInit {

  constructor(private auth :AuthService) { }

  ngOnInit() {
  }


}

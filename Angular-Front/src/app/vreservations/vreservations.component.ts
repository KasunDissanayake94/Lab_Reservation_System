import { Component,
  ChangeDetectionStrategy,
  ViewChild,
  TemplateRef, OnInit } from '@angular/core';
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
const now = new Date();
import {Router} from "@angular/router";
import {FlashMessagesService} from "angular2-flash-messages";
import {AuthService} from "../service/auth.service";
import {FormControl} from "@angular/forms";



@Component({
  selector: 'app-vreservations',
  templateUrl: './vreservations.component.html',
  styleUrls: ['./vreservations.component.css']
})
export class VreservationsComponent implements OnInit {

  model: NgbDateStruct;
  date: {year: number, month: number};
  //defining week days
  public labs = ['LAB A','LAB B','LAB C','LAB D','ELECTRONIC LAB','3RD YEAR LAB','4TH YEAR LAB','x'];
  public time_slots = ['7-8','8-9','9-10','10-11','11-12','12-1','1-2','2-3','3-4','4-5','5-6'];

  search = {
    date: '',
  }
  private reserved_labs: any;

  selectToday() {
    this.model = {year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate()};
    this.all_reservations();
  }
constructor(private authService : AuthService,private router: Router,private _flashMessagesService: FlashMessagesService){

}
  ngOnInit() {
  }

  all_reservations() {

    var day =String(this.model.day);
    var year = String(this.model.year);
    var month = String(this.model.month);
    var str1 = year.concat( '-0' );
    var str2 = str1.concat( month );
    var str3 = str2.concat( '-' );
    var real_date = str3.concat( day );
    this.search.date = real_date;

    this.authService.search_labs(this.search).subscribe(res=>{
      this.reserved_labs = res.labset;

    });

  }
}

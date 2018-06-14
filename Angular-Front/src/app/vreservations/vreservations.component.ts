import { Component,
  ChangeDetectionStrategy,
  ViewChild,
  TemplateRef, OnInit } from '@angular/core';
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
const now = new Date();


@Component({
  selector: 'app-vreservations',
  templateUrl: './vreservations.component.html',
  styleUrls: ['./vreservations.component.css']
})
export class VreservationsComponent implements OnInit {

  model: NgbDateStruct;
  date: {year: number, month: number};
  //defining week days
  public labs = ['LAB A','LAB B','LAB C','LAB D','LAB E','ELECTRONIC LAB','3RD YEAR LAB','4TH YEAR LAB','x'];

  selectToday() {
    this.model = {year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate()};
  }
constructor(){

}
  ngOnInit() {
  }

  all_reservations() {
    console.log("method called");
  }
}

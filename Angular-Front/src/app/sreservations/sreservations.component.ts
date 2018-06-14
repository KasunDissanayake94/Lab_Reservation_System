import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {FlashMessagesService} from "angular2-flash-messages";
import {AuthService} from "../service/auth.service";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-sreservations',
  templateUrl: './sreservations.component.html',
  styleUrls: ['./sreservations.component.css']
})
export class SreservationsComponent implements OnInit {
  display='none';
  dsplay='none';
  dsplay2 = 'none';
  delete_item ='none';
  public selectedMoments = [new Date(), new Date()];
  date: Date = new Date();

  curremnt_time = new Date().toLocaleTimeString('en-US', { hour: 'numeric', hour12:
    false, minute: 'numeric' });



  public lab_array = [];
  public labs = ['LAB A','LAB B','LAB C','LAB D','LAB E','ELECTRONIC LAB','3RD YEAR LAB','4TH YEAR LAB','x'];
  public canreservelabs = ['LAB A','LAB B','LAB C','LAB D','LAB E','ELECTRONIC LAB','3RD YEAR LAB','4TH YEAR LAB','x'];
  public  freelabs = ['LAB A','LAB B','LAB C','LAB D','LAB E','ELECTRONIC LAB','3RD YEAR LAB','4TH YEAR LAB','x'];

  reserv = {
    date: '',
    start_time: '',
    lab: '',
    lecturer: '',
    subject: '',
    course: '',

  };
  search = {
    date: '',
    start_time: '',
  }
  private result: any;
  private displaytable: string;
  private selected_lab: string;
  private dataset: any;

  constructor(private authService : AuthService,private router: Router,private _flashMessagesService: FlashMessagesService) {
    this.displaytable='none';
  }


  ngOnInit() {
  }
//To the Model--------------------------
  doreservation(selectlab) {
    console.log("Lb is here",selectlab);
    this.selected_lab = selectlab;
    this.reserv.lab = this.selected_lab;
    this.display="block";
  }
  closeResolved(){
    this.display="none";
  }
  onCloseHandled(){
    this.display='none';
  }
  //----------------------------------------
  addrevervation(){
    this.display='none';
    this.authService.addreservation(this.reserv).subscribe(res=>{
      if(res.state == true){
        this._flashMessagesService.show('Reservation Done Successfully!', { cssClass: 'alert-success', timeout: 5000 });
      }else if(res.state == false){
        this._flashMessagesService.show('Reservation Failed!', { cssClass: 'alert-danger', timeout: 5000});
      }
    });

  }
  search_labs(){
    this.search.date = this.reserv.date;
    this.search.start_time = this.reserv.start_time;
    console.log(this.search.date);
    this.authService.serach_reservations(this.search).subscribe(res=>{
      this.lab_array.push(res.dataset);
      this.dataset = res.dataset;
      this.displaytable = "block";
    });



    }

  cancelsearch() {
    this.reserv.date = '';
    this.reserv.start_time = '';
    this.reserv.lab = '';
    this.reserv.lecturer = '';
    this.reserv.subject = '';
    this.reserv.course = '';
    this.search.date = '';
    this.search.start_time = '';
    this.displaytable= 'none';
    this.lab_array = [];

  }

}

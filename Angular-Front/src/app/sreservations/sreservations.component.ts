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
  display3 = 'none';
  delete_item ='none';
  public selectedMoments = [new Date(), new Date()];
  date: Date = new Date();
  requestby = '';
  disable_status = false;

  curremnt_time = new Date().toLocaleTimeString('en-US', { hour: 'numeric', hour12:
    false, minute: 'numeric' });



  public lab_array = [];
  public labs = ['LAB A','LAB B','LAB C','LAB D','LAB E','ELECTRONIC LAB','3RD YEAR LAB','4TH YEAR LAB','x'];
  public canreservelabs = ['LAB A','LAB B','LAB C','LAB D','LAB E','ELECTRONIC LAB','3RD YEAR LAB','4TH YEAR LAB','x'];
  public  freelabs = ['LAB A','LAB B','LAB C','LAB D','LAB E','ELECTRONIC LAB','3RD YEAR LAB','4TH YEAR LAB','x'];
  public  test_array = [];
  user : any;

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
  };
  request_labs = {
    date: '',
    start_time: '',
    lab: '',
    request_by:''
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
    this.selected_lab = selectlab;
    this.reserv.lab = this.selected_lab;
    this.display="block";
  }
  closeResolved(){
    this.display="none";
  }
  onCloseHandled(){
    this.display='none';
    this.display3='none';
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
    if(this.reserv.date == '' || this.reserv.start_time == ''){
      return false;
    }
    this.disable_status = true;
    this.search.date = this.reserv.date;
    this.search.start_time = this.reserv.start_time;
    console.log(this.search.date);
    this.authService.serach_reservations(this.search).subscribe(res=>{
      //this.lab_array.push(res.dataset);
      this.dataset = res.dataset;
      this.displaytable = "block";
      //push reserved labs to lab array
      for(var i = 0;i<res.dataset.length;i++){
        this.lab_array.push(res.dataset[i].lab);
      }
      console.log(this.lab_array.indexOf('LAB B') > -1);
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
    this.disable_status = false;

  }
  request(lab,time,date){
    this.display3="block";
    this.request_labs.date = date;
    this.request_labs.start_time = time;
    this.request_labs.lab = lab;
}
  dorequest(){
    //Hard coded
    this.requestby = "instructor";
    this.request_labs.request_by = this.requestby;
    //send to the backend
    this.display3='none';
    this.authService.add_request(this.request_labs).subscribe(res=>{
      if(res.state == true){
        this._flashMessagesService.show('Request send to the Admin Successfully!', { cssClass: 'alert-success', timeout: 5000 });
      }else if(res.state == false){
        this._flashMessagesService.show('Request send Failed!', { cssClass: 'alert-danger', timeout: 5000});
      }
    });

  }
  call_disable(){
    return this.disable_status;

  }


}

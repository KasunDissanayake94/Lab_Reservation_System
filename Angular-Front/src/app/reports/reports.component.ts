import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import * as jsPDF from 'jspdf';
import 'jsPDF-autotable';
import CanvasJS from 'canvasjs';
import {AuthService} from "../service/auth.service";
import {forEach} from "@angular/router/src/utils/collection";
import {element} from "protractor";


@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {
  @ViewChild('baseChart')baseChart :ElementRef;


  search = {
    lab: '',
  };
   jan = 0;
   feb = 0;
   mar = 0;
   apr = 0;
   may = 0;
   jun = 0;
   jul = 0;
   aug = 0;
   sep = 0;
   oct = 0;
   nov = 0;
   dec = 0;
  labA_array = [];
  labB_array = [];
  labC_array = [];
  labD_array = [];
  labE_array = [];
  thirdyear_array = [];
  forth_array = [];
  other_array = [];
  //Count data to the perticular month
  constructor(private authService : AuthService) {

  }


  ngOnInit() {
  }
  createPdf(){
    this.search.lab = 'LAB A';
    this.authService.countdata(this.search).subscribe(res=>{
      if(res.state == true){
        for(let x of res.labset){

          if(x.date.substring(5,7) == '01'){
            this.jan = this.jan+1;
          }else if(x.date.substring(5,7) == '02'){
            this.feb = this.feb+1;
          }else if(x.date.substring(5,7) == '03'){
            this.mar = this.mar+1;
          }else if(x.date.substring(5,7) == '04'){
            this.apr = this.apr+1;
          }else if(x.date.substring(5,7) == '05'){
            this.may = this.may+1;
          }else if(x.date.substring(5,7) == '06'){
            this.jun = this.jun+1;
          }else if(x.date.substring(5,7) == '07'){
            this.jul = this.jul+1;
          }else if(x.date.substring(5,7) == '08'){
            this.aug = this.aug+1;
          }else if(x.date.substring(5,7) == '09'){
            this.sep = this.sep+1;
          }else if(x.date.substring(5,7) == '10'){
            this.oct = this.oct+1;
          }else if(x.date.substring(5,7) == '11'){
            this.nov = this.nov+1;
          }else if(x.date.substring(5,7) == '12'){
            this.dec = this.dec+1;
          }
        }
        var rows = [
          {"id": 1, "month": "January", "hours": this.jan*2},
          {"id": 2, "month": "February", "hours": this.feb*2},
          {"id": 3, "month": "March", "hours": this.mar*2},
          {"id": 4, "month": "April", "hours": this.apr*2},
          {"id": 5, "month": "May", "hours": this.may*2},
          {"id": 6, "month": "June", "hours": this.jun*2},
          {"id": 7, "month": "July", "hours": this.jul*2},
          {"id": 8, "month": "August", "hours": this.aug*2},
          {"id": 9, "month": "September", "hours": this.sep*2},
          {"id": 10, "month": "October", "hours": this.oct*2},
          {"id": 11 , "month": "November", "hours": this.nov*2},
          {"id": 12, "month": "December", "hours": this.dec*2},
        ];
        var doc = new jsPDF('p', 'pt');
        var columns = [
          {title: "ID", dataKey: "id"},
          {title: "Month", dataKey: "month"},
          {title: "Usage(Hours)", dataKey: "hours"},
        ];


        doc.autoTable(columns,rows);

        //var img ='../../assets/images/background.jpg';
        //doc.addImage(img, 'JPEG', 15, 40, 180, 160)
        doc.save('testfime.pdf');
      }else if(res.state == false){
      }
    });



  }
  downloadPDF(){
    let doc = new jsPDF();
    let specialElementHandlers = {
        '#editor' :function (element, renderer) {
          return true;
        }
    };
    let content = this.baseChart.nativeElement;
    doc.fromHTML(content.innerHTML ,15,15,{
      'width' :190,
      'elementHandlers': specialElementHandlers
    });
    doc.save('chart.pdf');
  }





}

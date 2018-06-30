import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import * as jsPDF from 'jspdf';
import { DatePipe } from '@angular/common';
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import 'jsPDF-autotable';
import CanvasJS from 'canvasjs';
import {AuthService} from "../service/auth.service";
import {isUpperCase} from "tslint/lib/utils";
const now = new Date();
@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {
  //@ViewChild('baseChart')baseChart :ElementRef;
  search = {
    lab: '',
  };
  display_month = '';
  search_month ={
    month: '',
  };
  download_pdf ='';
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


  LAB_A = 0;
  LAB_B = 0;
  LAB_C = 0;
  LAB_D = 0;
  LAB_E = 0;
  THIRD_YEAR_LAB = 0;
  FORTH_YEAR_LAB = 0;
  ELECTRONIC = 0;
  OTHER_LAB = 0;


  private displaylabUage: string;
  private rows: any;
  generateusage =  '';
  generatemothlyusage = '';
  user_report = '';
  private dataset: any;
  private columns: { title: string; dataKey: string }[];
  displayMonthlylabUage = '';

  //Count data to the perticular month
  constructor(private authService : AuthService ,private datePipe: DatePipe) {
    this.displaylabUage='none';
    this.generateusage = 'none';
    this.generatemothlyusage = 'none';
    this.user_report = 'none';
    this.displayMonthlylabUage = 'none';

  }

  ngOnInit() {
  }
  createPdf(lab){
    this.jan=0,this.feb=0,this.mar=0,this.apr=0,this.may=0,this.jun=0;
    this.jul=0,this.aug=0,this.sep=0,this.oct=0,this.nov=0,this.dec =0;
    this.search.lab = lab;
    this.rows=[];
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
        this.displaylabUage = "block";
        this.rows = [
          {"id": 1, "month": "January", "hours": this.jan},
          {"id": 2, "month": "February", "hours": this.feb},
          {"id": 3, "month": "March", "hours": this.mar},
          {"id": 4, "month": "April", "hours": this.apr},
          {"id": 5, "month": "May", "hours": this.may},
          {"id": 6, "month": "June", "hours": this.jun},
          {"id": 7, "month": "July", "hours": this.jul},
          {"id": 8, "month": "August", "hours": this.aug},
          {"id": 9, "month": "September", "hours": this.sep},
          {"id": 10, "month": "October", "hours": this.oct},
          {"id": 11 , "month": "November", "hours": this.nov},
          {"id": 12, "month": "December", "hours": this.dec},
        ];
        this.columns = [
          {title: "", dataKey: "id"},
          {title: "Month", dataKey: "month"},
          {title: "Lab Usage(Hours)", dataKey: "hours"},
        ];
        this.download_pdf = "annually_usage_report.pdf";

      }else if(res.state == false){
      }
    });

  }
  generateReport(title){
    var doc = new jsPDF();
    doc.autoTable(this.columns,this.rows,{
      margin: {top:35},
      addPageContent: function (data) {
        doc.text(title,50,20);
        doc.text("Issue Date : "+now.getFullYear()+"-"+(now.getMonth()+1)+"-"+now.getDate(),14,28,{
          fontSize: 4
        });
      }
    });
    //var img ='../../assets/images/background.jpg';
    //doc.addImage(img, 'JPEG', 15, 40, 180, 160)
    doc.save(this.download_pdf);
  }
  // downloadPDF(){
  //   let doc = new jsPDF();
  //   let specialElementHandlers = {
  //       '#editor' :function (element, renderer) {
  //         return true;
  //       }
  //   };
  //   let content = this.baseChart.nativeElement;
  //   doc.fromHTML(content.innerHTML ,15,15,{
  //     'width' :190,
  //     'elementHandlers': specialElementHandlers
  //   });
  //   doc.save('chart.pdf');
  // }


  generate_annual_report() {
    this.generateusage = 'block';
    this.generatemothlyusage = 'none';
    this.user_report = 'none';
    this.displayMonthlylabUage = 'none';
  }

  generate_monthly_report() {
    this.generateusage = 'none';
    this.user_report = 'none';
    this.generatemothlyusage = 'block';
    this.displaylabUage = 'none';
    this.displayMonthlylabUage = 'none';
  }

  generate_users_report() {
    this.generateusage = 'none';
    this.generatemothlyusage = 'none';
    this.user_report = 'block';
    this.displaylabUage = 'none';
    this.displayMonthlylabUage = 'none';
    this.columns=[];
    this.rows =[];
    this.authService.search_all_users().subscribe(res=>{
      if(res.state == true){
        this.dataset = res.users;
        var count = 1;
        for(let x of res.users){
          this.rows.push({"id": count, "username": x.username, "name": x.name, "email": x.email , "type" :x.type});
          count = count+1;
        }
        this.columns = [
          {title: "", dataKey: "id"},
          {title: "Username", dataKey: "username"},
          {title: "Name", dataKey: "name"},
          {title: "Email", dataKey: "email"},
          {title: "Type", dataKey: "type"},
        ];
        this.download_pdf = "system_user_report.pdf";

      }else if(res.state == false){
        console.log("No response here");
      }
    });


  }


  find_monthly_usage(month) {
    //Display Month
    if(month == 1){
      this.display_month = 'JANUARY';
    }else if(month == 2){
      this.display_month = 'FEBRUARY';
    }else if(month == 3){
      this.display_month = 'MARCH';
    }else if(month == 4){
      this.display_month = 'APRIL';
    }else if(month == 5){
      this.display_month = 'MAY';
    }else if(month == 6){
      this.display_month = 'JUNE';
    }else if(month == 7){
      this.display_month = 'JULY';
    }else if(month == 8){
      this.display_month = 'AUGUST';
    }else if(month == 9){
      this.display_month = 'SEPTEMBER';
    }else if(month == 10){
      this.display_month = 'OCTOBER';
    }else if(month == 11){
      this.display_month = 'NOVEMBER';
    }else if(month == 12){
      this.display_month = 'DECEMBER';
    }
    this.LAB_A=0,this.LAB_B=0,this.LAB_C=0,this.LAB_D=0,this.LAB_E=0,this.THIRD_YEAR_LAB=0,this.FORTH_YEAR_LAB=0,this.ELECTRONIC=0,this.OTHER_LAB=0;
    this.search_month.month = month;
    this.displayMonthlylabUage ='block';
    this.authService.count_monthly_labs(this.search_month).subscribe(res=>{
      if(res.state == true){
        for(let x of res.labset){
          if(x.lab == 'LAB A'){
            this.LAB_A = this.LAB_A+1;
          }else if(x.lab == 'LAB B'){
            this.LAB_B=this.LAB_B+1;
          }else if(x.lab == 'LAB C'){
            this.LAB_C = this.LAB_C+1;
          }else if(x.lab == 'LAB D'){
            this.LAB_D = this.LAB_D+1;
          }else if(x.lab == 'LAB E'){
            this.LAB_E = this.LAB_E+1;
          }else if(x.lab == '3RD YEAR LAB'){
            this.THIRD_YEAR_LAB = this.THIRD_YEAR_LAB +1;
          }else if(x.lab == '4TH YEAR LAB'){
            this.FORTH_YEAR_LAB = this.FORTH_YEAR_LAB +1;
          }else if(x.lab == 'ELECTRONIC LAB'){
            this.ELECTRONIC = this.ELECTRONIC +1;
          }else if(x.lab == 'OTHER'){
            this.OTHER_LAB = this.OTHER_LAB+1;
          }
        }
        this.rows = [
          {"id": 1, "lab": "LAB A", "hours": this.LAB_A},
          {"id": 2, "lab": "LAB B", "hours": this.LAB_B},
          {"id": 3, "lab": "LAB C", "hours": this.LAB_C},
          {"id": 4, "lab": "LAB D", "hours": this.LAB_D},
          {"id": 5, "lab": "LAB E", "hours": this.LAB_E},
          {"id": 6, "lab": "3RD YEAR LAB", "hours": this.THIRD_YEAR_LAB},
          {"id": 7, "lab": "4TH YEAR LAB", "hours": this.FORTH_YEAR_LAB},
          {"id": 8, "lab": "ELECTRONIC LAB", "hours": this.ELECTRONIC},
          {"id": 9, "lab": "OTHER", "hours": this.OTHER_LAB},

        ];
        this.columns = [
          {title: "", dataKey: "id"},
          {title: "LAB NO", dataKey: "lab"},
          {title: "Lab Usage(Hours)", dataKey: "hours"},
        ];
        this.download_pdf = "monthly_usage_report.pdf";


      }else if(res.state == false){
      }
    });

  }
}

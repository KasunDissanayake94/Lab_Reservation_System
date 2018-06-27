import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import * as jsPDF from 'jspdf';
import 'jsPDF-autotable';
import CanvasJS from 'canvasjs';


@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {
  @ViewChild('content')content :ElementRef;
  public lineChartData:Array<any> = [
    {data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A'},
    {data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B'},
    {data: [18, 48, 77, 9, 100, 27, 40], label: 'Series C'}
  ];
  public lineChartLabels:Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  public lineChartOptions:any = {
    responsive: true
  };
  public lineChartColors:Array<any> = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // dark grey
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  public lineChartLegend:boolean = true;
  public lineChartType:string = 'line';

  public randomize():void {
    let _lineChartData:Array<any> = new Array(this.lineChartData.length);
    for (let i = 0; i < this.lineChartData.length; i++) {
      _lineChartData[i] = {data: new Array(this.lineChartData[i].data.length), label: this.lineChartData[i].label};
      for (let j = 0; j < this.lineChartData[i].data.length; j++) {
        _lineChartData[i].data[j] = Math.floor((Math.random() * 100) + 1);
      }
    }
    this.lineChartData = _lineChartData;
  }



  constructor() { }

  ngOnInit() {
  }
  createPdf(){
    var doc = new jsPDF('p', 'pt');
    var columns = [
      {title: "ID", dataKey: "id"},
      {title: "Lab Name", dataKey: "name"},
      {title: "Usage(DAYS)", dataKey: "days"},
    ];
    var rows = [
      {"id": 1, "name": "Lab A", "days": "22"},
      {"id": 2, "name": "Lab B", "days": "3"},
      {"id": 3, "name": "Lab C", "days": "11"},
      {"id": 4, "name": "Lab C", "days": "11"},
      {"id": 5, "name": "Lab C", "days": "11"},
      {"id": 6, "name": "Lab C", "days": "11"},
      {"id": 7, "name": "Lab C", "days": "11"},
    ];

    doc.autoTable(columns,rows);

    //var img ='../../assets/images/background.jpg';
    //doc.addImage(img, 'JPEG', 15, 40, 180, 160)
    doc.save('testfime.pdf');

  }
  downloadPDF(){
    let doc = new jsPDF();
    let specialElementHandlers = {
        '#editor' :function (element, renderer) {
          return true;
        }
    };
    let content = this.content.nativeElement;
    doc.fromHTML(content.innerHTML ,15,15,{
      'width' :190,
      'elementHandlers': specialElementHandlers
    });
    doc.save('chart.pdf');
  }



}

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sreservations',
  templateUrl: './sreservations.component.html',
  styleUrls: ['./sreservations.component.css']
})
export class SreservationsComponent implements OnInit {

// Min moment: February 12 2018, 10:30
  public min = new Date(2018, 1, 12, 10, 30);

  // Max moment: April 21 2018, 20:30
  public max = new Date(2018, 3, 21, 20, 30);

  constructor() { }

  ngOnInit() {
  }

}

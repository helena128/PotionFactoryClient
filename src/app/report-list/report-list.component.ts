import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-report-list',
  templateUrl: './report-list.component.html',
  styleUrls: ['./report-list.component.scss']
})
export class ReportListComponent implements OnInit {

  transferList = [
    {
      id: '1',
      status: 'In transfer',
      products: ['Everlasting Happiness']
    },
    {
      id: '2',
      status: 'Produced',
      products: ['Everlasting Happiness']
    }
  ];

  constructor() {
  }

  ngOnInit(): void {
  }

}

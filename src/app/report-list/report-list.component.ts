import {Component, OnInit} from '@angular/core';
import {GraphqlService} from "../graphql.service";

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

  constructor(private graphqlService: GraphqlService) {
  }

  ngOnInit(): void {
  }

}

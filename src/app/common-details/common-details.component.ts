import {Component, Input, OnInit} from '@angular/core';
import {Details} from "../model/details";

@Component({
  selector: 'app-common-details',
  templateUrl: './common-details.component.html',
  styleUrls: ['./common-details.component.scss']
})
export class CommonDetailsComponent implements OnInit {

  @Input()
  public details: any;

  constructor() { }

  ngOnInit(): void {
  }

}

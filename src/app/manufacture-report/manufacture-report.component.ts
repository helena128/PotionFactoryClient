import { Component, OnInit } from '@angular/core';
import {ManufactureReportItem} from "../model/manufacture-report-item";

@Component({
  selector: 'app-manufacture-report',
  templateUrl: './manufacture-report.component.html',
  styleUrls: ['./manufacture-report.component.scss']
})
export class ManufactureReportComponent implements OnInit {

  public amountValues: Array<number>;
  public manufacturedItemList: Array<ManufactureReportItem>;

  constructor() { }

  ngOnInit(): void {
    this.initAmountValues();
    this.initManufacturedItemList();
  }

  private initManufacturedItemList(): void {
    this.manufacturedItemList = new Array<ManufactureReportItem>();
    this.manufacturedItemList.push(
      {
        potionName: 'Potion One',
        amount: 3
      },
      {
        potionName: 'Potion Two',
        amount: 4
      },
      {
        potionName: 'Potion Three',
        amount: 2
      }
    )
  }

  private initAmountValues(): void {
    this.amountValues = Array.from(Array(10).keys());
  }
}

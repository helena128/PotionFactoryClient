import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  public amountOptions: Array<number>;

  constructor() { }

  ngOnInit(): void {
    this.initAmountArray();
  }

  private initAmountArray(): void {
    this.amountOptions = Array.from(Array(10).keys());
  }

}

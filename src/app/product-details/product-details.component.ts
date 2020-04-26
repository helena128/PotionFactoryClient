import {Component, OnInit} from '@angular/core';
import {UserRole} from "../model/user-role";

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  public userRole: UserRole = UserRole.WorkshopOperator;
  public amountOptions: Array<number>;

  constructor() { }

  ngOnInit(): void {
    this.initAmountArray();
  }

  private initAmountArray(): void {
    this.amountOptions = Array.from(Array(10).keys());
  }

}

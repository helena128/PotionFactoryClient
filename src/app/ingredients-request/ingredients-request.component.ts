import { Component, OnInit } from '@angular/core';
import {IngredientRequest} from "../model/ingredient-request";

@Component({
  selector: 'app-ingredients-request',
  templateUrl: './ingredients-request.component.html',
  styleUrls: ['./ingredients-request.component.scss']
})
export class IngredientsRequestComponent implements OnInit {

  public ingredientRequestList: Array<IngredientRequest>;
  public amountValues: Array<number>;

  constructor() { }

  ngOnInit(): void {
    this.initRequests();
    this.initAmountValues();
  }

  private initAmountValues(): void {
    this.amountValues = Array.from(Array(10).keys());
  }

  private initRequests(): void {
    this.ingredientRequestList = new Array<IngredientRequest>();
    this.ingredientRequestList.push(
      {
        name: 'Ingredient One',
        amount: 2
      },
      {
        name: 'Ingredient Two',
        amount: 3
      },
      {
        name: 'Ingredient Three',
        amount: 4
      }
    )
  }

}

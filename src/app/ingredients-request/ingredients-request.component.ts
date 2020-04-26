import { Component, OnInit } from '@angular/core';
import {IngredientRequest} from "../model/ingredient-request";
import {Router} from "@angular/router";

@Component({
  selector: 'app-ingredients-request',
  templateUrl: './ingredients-request.component.html',
  styleUrls: ['./ingredients-request.component.scss']
})
export class IngredientsRequestComponent implements OnInit {

  public ingredientRequestList: Array<IngredientRequest>;
  public amountValues: Array<number>;

  // UI: fetch all ingredients, select all from fetched ingredients, limit, add info buttons

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.initRequests();
    this.initAmountValues();
  }

  public redirectToDetailsPage(id: number) {
    this.router.navigate(['/main/ingredients/:id', id]);
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

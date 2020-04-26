import { Component, OnInit } from '@angular/core';
import {Ingredient} from "../model/ingredient";

@Component({
  selector: 'app-ingredient-details',
  templateUrl: './ingredient-details.component.html',
  styleUrls: ['./ingredient-details.component.scss']
})
export class IngredientDetailsComponent implements OnInit {

  public ingredient: Ingredient = new Ingredient();

  constructor() { }

  ngOnInit(): void {
    this.initIngredient();
  }

  private initIngredient(): void {
    this.ingredient = new Ingredient();
    this.ingredient.name = "Ingredient One";
    this.ingredient.id = 1;
    this.ingredient.description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et\n" +
      "      dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea\n" +
      "      commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla\n" +
      "      pariatur.";
  }

}

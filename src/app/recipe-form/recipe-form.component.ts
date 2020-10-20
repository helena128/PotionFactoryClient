import { Component, OnInit } from '@angular/core';
import {Ingredient} from "../api-types";

@Component({
  selector: 'app-recipe-form',
  templateUrl: './recipe-form.component.html',
  styleUrls: ['./recipe-form.component.scss']
})
export class RecipeFormComponent implements OnInit {

  ingredientList: any[];

  constructor() { }

  ngOnInit(): void {
    this.ingredientList = [
      {
        id: 1,
        name: 'Ingredient1'
      },
      {
        id: 2,
        name: 'Ingredient2'
      }
    ];
  }

}

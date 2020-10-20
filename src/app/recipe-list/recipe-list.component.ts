import { Component, OnInit } from '@angular/core';
import {Ingredient, Recipe} from "../api-types";

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent implements OnInit {

  recipes: Recipe[];
  createRecipeButtonCaption = 'Create recipe';

  constructor() { }

  ngOnInit(): void {
    this.recipes = [
      {
        id: 1,
        name: 'Everlasting Love',
        ingredients: [
          {
            id: 2,
            name: 'Ingredient1'
          } as Ingredient,
          {
            id: 2,
            name: 'Ingredient2'
          } as Ingredient
        ]
      } as Recipe
    ];
  }

}

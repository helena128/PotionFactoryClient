import { Component, OnInit } from '@angular/core';
import {Recipe} from "../api-types";

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.scss']
})
export class RecipeDetailsComponent implements OnInit {
  recipe: any;

  constructor() { }

  ngOnInit(): void {
    this.recipe = {
      id: 1,
      name: 'Demo Recipe',
      description: 'Small description of recipe',
      tags: ['Ingredient1', 'Ingredient2']
    };
  }

}

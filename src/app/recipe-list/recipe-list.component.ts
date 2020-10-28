import { Component, OnInit } from '@angular/core';
import {Ingredient, Recipe, UserRole} from "../api-types";
import {GraphqlService} from "../graphql.service";

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent implements OnInit {

  recipes: Recipe[];
  createRecipeButtonCaption = 'Create recipe';

  constructor(private graphQlService: GraphqlService) { }

  ngOnInit(): void {
    this.graphQlService.getAllRecipes().subscribe(data => this.recipes = data);
  }

  getIngredients(ingredientList: Ingredient[]): string {
    return ingredientList ? ingredientList.map(ingr => ingr.name).slice(0, 2).join(', ') : '';
  }

  canCreateRecipe(): boolean {
    return localStorage.getItem('userRole') === UserRole.Fairy;
  }
}

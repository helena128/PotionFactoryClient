import { Component, OnInit } from '@angular/core';
import {Ingredient, Recipe, RecipeArg, UserRole} from "../api-types";
import {GraphqlService} from "../graphql.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-recipe-form',
  templateUrl: './recipe-form.component.html',
  styleUrls: ['./recipe-form.component.scss']
})
export class RecipeFormComponent implements OnInit {

  availableIngredients: any[];
  chosenIngredients: any[];
  userRoleGroup: FormGroup;
  currentIngredient;
  description: string;
  recipeName: string;
  private ingredients: Ingredient[];

  constructor(private graphQlService: GraphqlService, private fb: FormBuilder, private toasterService: ToastrService) { }

  ngOnInit(): void {
    this.graphQlService.getAllIngredients().subscribe(data => {
      this.availableIngredients = data.map(ingr => ingr.name);
      this.ingredients = data;
    });
    this.chosenIngredients = [''];
    this.userRoleGroup = this.fb.group({
      userRoleControl: [ {name: ''} ]
    });
    this.userRoleGroup.valueChanges.subscribe(x => this.currentIngredient = x);
    this.description = '';
  }

  handleCurrentIngredientChange(event): void {
    this.currentIngredient = event;
  }

  remove(idx: number): void {
    if (idx >= 0 && idx < this.chosenIngredients.length) {
      this.chosenIngredients.splice(idx, 1);
    }
    if (this.chosenIngredients.length === 0) {
      this.chosenIngredients.push('');
    }
  }

  add(): void {
    if (this.currentIngredient) {
      this.chosenIngredients.splice(this.chosenIngredients.length - 1, 0, this.currentIngredient);
    }
  }

  createRecipe(): void {
    // TODO: validation of input fields
    const ingredientIds = this.ingredients.filter(ingr => this.isIngredientChosen(ingr?.name)).map(ingr => ingr.id);
    const recipeArg = {
      name: this.recipeName,
      description: this.description,
      ingredients: ingredientIds
    };
    console.debug('Ingredient in recipes: ', ingredientIds);
    this.graphQlService.createRecipe(recipeArg).subscribe(data =>
      this.toasterService.success('Created recipe ' + (data as Recipe)?.name));
  }

  private isIngredientChosen(ingrName: string): boolean {
    return this.chosenIngredients.indexOf(ingrName) > -1 && ingrName !== '';
  }
}

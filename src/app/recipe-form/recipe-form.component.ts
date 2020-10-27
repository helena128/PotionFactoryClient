import { Component, OnInit } from '@angular/core';
import {Ingredient} from "../api-types";
import {GraphqlService} from "../graphql.service";

@Component({
  selector: 'app-recipe-form',
  templateUrl: './recipe-form.component.html',
  styleUrls: ['./recipe-form.component.scss']
})
export class RecipeFormComponent implements OnInit {

  ingredientList: any[];

  constructor(private graphQlService: GraphqlService) { }

  ngOnInit(): void {
    this.graphQlService.getAllIngredients().subscribe(data => this.ingredientList = data);
  }

}

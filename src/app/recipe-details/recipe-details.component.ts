import { Component, OnInit } from '@angular/core';
import {Recipe} from "../api-types";
import {GraphqlService} from "../graphql.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.scss']
})
export class RecipeDetailsComponent implements OnInit {
  recipe: any;

  constructor(private graphqlService: GraphqlService,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    /*this.recipe = {
      id: 1,
      name: 'Demo Recipe',
      description: 'Small description of recipe',
      tags: ['Ingredient1', 'Ingredient2']
    };*/
    const id = Number.parseInt(this.activatedRoute.snapshot.paramMap.get('id'));
    if (!id) {
      console.error("EXCEPTION");
    } else {
      this.graphqlService.getRecipeById(id).subscribe(data => this.recipe = {
        id: data.id,
        name: data.name,
        description: data.description,
        tags: data.ingredients.map(ingredient => ingredient.name)
      });
    }
  }

}

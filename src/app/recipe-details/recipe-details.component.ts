import {Component, OnInit} from '@angular/core';
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
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    const id = Number.parseInt(this.activatedRoute.snapshot.paramMap.get('id'));
    this.graphqlService.getRecipeById(id).subscribe(data => this.recipe = {
      id: data.id,
      name: data.name,
      description: data.description,
      tags: data.ingredients.map(ingredient => ingredient.name)
        .filter((item, i, ar) => ar.indexOf(item) === i)
    });
  }

}

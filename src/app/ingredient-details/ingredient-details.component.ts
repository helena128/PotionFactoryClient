import { Component, OnInit } from '@angular/core';
import {GraphqlService} from "../graphql.service";
import {ActivatedRoute} from "@angular/router";
import {Ingredient} from "../api-types";

@Component({
  selector: 'app-ingredient-details',
  templateUrl: './ingredient-details.component.html',
  styleUrls: ['./ingredient-details.component.scss']
})
export class IngredientDetailsComponent implements OnInit {

  private id: number;
  public ingredient: Ingredient;

  constructor(private apiService: GraphqlService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = Number.parseInt(this.route.snapshot.paramMap.get('id'));
    this.apiService.getIngredientById(this.id).subscribe((data) => this.ingredient = data)
  }

}

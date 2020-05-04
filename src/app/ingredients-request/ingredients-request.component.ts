import { Component, OnInit } from '@angular/core';
import {IngredientRequest} from "../model/ingredient-request";
import {Router} from "@angular/router";
import {GraphqlService} from "../graphql.service";
import {Observable} from "rxjs";
import {Ingredient} from "../api-types";
import {debounceTime, distinctUntilChanged, map} from "rxjs/operators";
import {by, element} from "protractor";

@Component({
  selector: 'app-ingredients-request',
  templateUrl: './ingredients-request.component.html',
  styleUrls: ['./ingredients-request.component.scss']
})
export class IngredientsRequestComponent implements OnInit {
  ingredients: Ingredient[] = []
  lastComplete: Ingredient[] = []

  selected: Number[] = []
  public amountValues: Array<number> = Array.from(Array(10).keys());

  constructor(private api: GraphqlService) {}
  ngOnInit() {
      this.api.getAllIngredients()
        .subscribe(data => this.ingredients = data)
  }

  search = (text: Observable<string>) =>
    text.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term => {
        let result =
          term.length < 2 ? []:
            this.ingredients
              .filter(v => v.name.toLowerCase().indexOf(term.toLowerCase()) > -1)
              .slice(0, 10)

        this.lastComplete = result
        return result.map(v => v.name)
      })
    )

  validateInput(s: String) {
    let l = this.lastComplete.filter(v => v.name == s)
    if (l.length != 1) alert("Eblan")
    else console.log(l[0])
  }
}

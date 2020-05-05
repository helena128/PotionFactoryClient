import { Component, OnInit } from '@angular/core';
import {IngredientRequest} from "../model/ingredient-request";
import {Router} from "@angular/router";
import {GraphqlService} from "../graphql.service";
import {Observable} from "rxjs";
import {Ingredient} from "../api-types";
import {debounceTime, distinctUntilChanged, map} from "rxjs/operators";
import {by, element} from "protractor";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-ingredients-request',
  templateUrl: './ingredients-request.component.html',
  styleUrls: ['./ingredients-request.component.scss']
})
export class IngredientsRequestComponent implements OnInit {
  ingredients: Ingredient[] = []
  lastComplete: Ingredient[] = []
  amountOptions = [1, 2, 3, 4, 5]
  countForm: FormGroup;

  public ingredientName: string = "";

  selected: Number[] = []
  public amountValues: Array<number> = Array.from(Array(10).keys());
  public ingredientList: Array<Ingredient>;
  public currentIngredient: Ingredient;

  constructor(private api: GraphqlService, private fb: FormBuilder, private router: Router) {}
  ngOnInit() {
    this.ingredientList = new Array<Ingredient>();
    this.ingredientList.push({} as Ingredient);
      this.api.getAllIngredients()
        .subscribe(data => this.ingredients = data)
    this.countForm = this.fb.group({
      countControl: [ 1 ]
    });
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

  public add(): void {
    const length = this.ingredientList.length;
    const amount = this.countForm.controls.countControl.value;
    this.currentIngredient.count = amount;
    this.ingredientList.pop();
    this.ingredientList.push(this.currentIngredient, {} as Ingredient);
  }

  public remove(idx: number): void {
    this.ingredientList.splice(idx, 1);
  }

  public redirectToDetailsPage(id: number): void {
    this.router.navigate(['ingredients', id]);
  }

  public request() {
    this.api.createIngredientRequest(this.ingredientList);
  }

  validateInput(s: String) {
    let l = this.lastComplete.filter(v => v.name == s)
    if (l.length != 1) console.error("Eblan");
    else {
      console.log(l[0])
      this.currentIngredient = l[0];
    }
  }
}

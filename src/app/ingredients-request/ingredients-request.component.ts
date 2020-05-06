import { Component, OnInit } from '@angular/core';
import {IngredientRequest} from "../model/ingredient-request";
import {Router} from "@angular/router";
import {GraphqlService} from "../graphql.service";
import {Observable} from "rxjs";
import {Ingredient} from "../api-types";
import {debounceTime, distinctUntilChanged, map} from "rxjs/operators";
import {by, element} from "protractor";
import {FormBuilder, FormGroup} from "@angular/forms";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-ingredients-request',
  templateUrl: './ingredients-request.component.html',
  styleUrls: ['./ingredients-request.component.scss']
})
export class IngredientsRequestComponent implements OnInit {
  availableIngredients: Ingredient[] = []
  amountOptions = [1, 2, 3, 4, 5]
  countForm: FormGroup;

  ingredientList: Array<Ingredient>;
  correctInput = false

  constructor(
    private api: GraphqlService,
    private fb: FormBuilder,
    private router: Router,
    private toaster: ToastrService) {}

  ngOnInit() {
    this.api.getAllIngredients()
      .subscribe(data => this.availableIngredients = data)

    const defaultCount = this.amountOptions[0]
    this.ingredientList = [{count: defaultCount} as Ingredient];

    this.countForm = this.fb.group({
      countControl: [ defaultCount ]
    });
  }

  search = (text: Observable<string>) =>
    text.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term =>
        this.availableIngredients
          .filter(v => v.name.toLowerCase().indexOf(term.toLowerCase()) > -1)
          .slice(0, 10)
          .map(v => v.name)))

  public add(): void {
    this.ingredientList.push({count: 1} as Ingredient)
    this.correctInput = false
  }

  public remove(idx: number): void {
    this.ingredientList.splice(idx, 1);
  }

  public redirectToDetailsPage(id: number): void {
    let url = this.router.createUrlTree(['ingredients', id]).toString()
    window.open(url)
  }

  public request() {
    let ingredients = []

    this.ingredientList
      .slice(0, -1)
      .forEach(e => {
        ingredients.length += e.count
        ingredients.fill(e.id, ingredients.length - e.count, ingredients.length)
      })

    this.api.createIngredientRequest({ingredients: ingredients})
      .subscribe(id => this.toaster.success("Request (id " + id + ") was created"));
  }

  public changeCount(index, count) {
    this.ingredientList[index].count = Number.parseInt(count)
  }

  validateInput(s: String) {
    let ingredient = this.availableIngredients.filter(v => v.name == s)[0]

    if (name !== undefined) {
      this.ingredientList[this.ingredientList.length-1].id = ingredient.id
      this.ingredientList[this.ingredientList.length-1].name = ingredient.name
      this.correctInput = true
    }
  }
}

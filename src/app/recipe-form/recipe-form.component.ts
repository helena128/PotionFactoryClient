import { Component, OnInit } from '@angular/core';
import {Ingredient, UserRole} from "../api-types";
import {GraphqlService} from "../graphql.service";
import {FormBuilder, FormGroup} from "@angular/forms";

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

  constructor(private graphQlService: GraphqlService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.graphQlService.getAllIngredients().subscribe(data => this.availableIngredients = data.map(ingr => ingr.name));
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
      console.debug('Remove: ', this.chosenIngredients);
    }
    if (this.chosenIngredients.length === 0) {
      this.chosenIngredients.push('');
    }
  }

  add(): void {
    if (this.currentIngredient) {
      this.chosenIngredients.splice(this.chosenIngredients.length - 1, 0, this.currentIngredient);
      console.debug('Add: ', this.chosenIngredients);
    }
  }
}

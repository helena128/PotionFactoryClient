import {Component, OnInit} from '@angular/core';
import {IngredientRequestItem} from "../model/ingredient-request-item";
import {UserRole} from "../api-types";
import {GraphqlService} from "../graphql.service";

@Component({
  selector: 'app-ingredients-list-component',
  templateUrl: './ingredients-list-component.component.html',
  styleUrls: ['./ingredients-list-component.component.scss']
})
export class IngredientsListComponentComponent implements OnInit {

  ingredientRequestList: IngredientRequestItem[];

  userRole = UserRole.WorkshopManager;

  constructor(private graphqlService: GraphqlService) { }

  ngOnInit(): void {
    this.ingredientRequestList = [
      {
        id: '2',
        status: 'Sent to workshop',
        ingredientNames: ['ingredient1', 'ingredient1', 'ingredient2']
      },
      {
        id: '1',
        status: 'SENT_TO_WORKSHOP',
        ingredientNames: ['ingredient1', 'ingredient1', 'ingredient2']
      }
    ];
    console.log('INIT');
  }

  public isWorkshopOperator(): boolean {
    return this.userRole === UserRole.WorkshopManager;
  }

}

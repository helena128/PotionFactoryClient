import {Component, OnInit} from '@angular/core';
import {IngredientRequestItem} from "../model/ingredient-request-item";
import {IngredientRequest, UserRole} from "../api-types";
import {GraphqlService} from "../graphql.service";

@Component({
  selector: 'app-ingredients-list-component',
  templateUrl: './ingredients-list-component.component.html',
  styleUrls: ['./ingredients-list-component.component.scss']
})
export class IngredientsListComponentComponent implements OnInit {

  ingredientRequestList: any[];

  userRole = UserRole.WorkshopManager;

  constructor(private graphqlService: GraphqlService) { }

  ngOnInit(): void {
    this.graphqlService.getIngredientRequests().subscribe(data => this.ingredientRequestList = data);
  }

  public isWorkshopOperator(): boolean {
    return this.userRole === UserRole.WorkshopManager;
  }

}

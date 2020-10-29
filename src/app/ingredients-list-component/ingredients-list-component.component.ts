import {Component, OnInit} from '@angular/core';
import {IngredientRequestItem} from "../model/ingredient-request-item";
import {IngredientRequest, UserRole} from "../api-types";
import {GraphqlService} from "../graphql.service";
import {Observable} from "rxjs";
import mapAsyncIterator from "graphql/subscription/mapAsyncIterator";
import * as api from "../api-types";
import {map} from "rxjs/operators";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-ingredients-list-component',
  templateUrl: './ingredients-list-component.component.html',
  styleUrls: ['./ingredients-list-component.component.scss']
})
export class IngredientsListComponentComponent implements OnInit {

  ingredientRequestList: any[];

  userRole;

  constructor(private graphqlService: GraphqlService, private toasterService: ToastrService) { }

  ngOnInit(): void {
    this.userRole = localStorage.getItem('userRole') as UserRole;
    this.graphqlService.getIngredientRequests().subscribe(data => this.ingredientRequestList = data);
  }

  public isWorkshopOperator(): boolean {
    console.debug('Current role: ', this.userRole);
    return this.userRole === UserRole.WorkshopManager;
  }

  getIngredientNames(ingredients: any[]) {
    if (!ingredients || ingredients?.length === 0) {
      return '';
    }
    const uniqueIngredientNames = ingredients.map(product => product.name).filter((item, i, ar) => ar.indexOf(item) === i);
    return uniqueIngredientNames.slice(0, 2).join(', ');
  }

  getIngredientInfo(ingredients: any) {
    const result = ingredients.map(item => item.name).reduce((a, c) => (a[c] = (a[c] || 0) + 1, a), Object.create(null));
    const resultedList = [];
    for (let key in result) {
      resultedList.push({name: key, val: result[key]});
    }
    return resultedList;
  }

  arrivedAtWorkshop(item: any) {
    this.graphqlService.receiveIngredients(item?.id).subscribe(data => {
      if (data) {
        this.toasterService.success('Successfully updated status of request');
        item.status = 'Received';
      } else {
        this.toasterService.error('Couldn\'t update status');
      }
    });
  }

  startTransfer(item: any) {
    this.graphqlService.transferProducts(item.id).subscribe(data => {
      if (data) {
        this.toasterService.success('Successfully started transfer');
        item.status = 'Transfer';
      } else {
        this.toasterService.error('Couldn\'t start transfer');
      }
    });
  }
}

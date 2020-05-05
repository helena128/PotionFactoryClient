import { Injectable } from '@angular/core';

import * as api from './api-types'

import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import {Observable, Subject} from 'rxjs';
import { map } from 'rxjs/operators';
import {MutationCreateOrderArgs, OrderArg} from "./api-types";
import {
  CREATE_ORDER_REQUEST,
  GET_ALL_INGREDIENTS,
  GET_ALL_PRODUCTS,
  GET_INGREDIENT_BY_ID,
  GET_PRODUCT_DETAILS,
  SEARCH_BOOK
} from "./graphql-constants";


@Injectable({
  providedIn: 'root'
})
export class GraphqlService {
  constructor(private apollo: Apollo) { }

  getAllIngredients(): Observable<api.Query['allIngredients']> {
    return this.apollo
      .watchQuery<api.Query['allIngredients']>({
        query: GET_ALL_INGREDIENTS})
      .valueChanges.pipe(map(r => r.data['allIngredients']))
  }
  // createRequest()

  searchBooks(string: String, limit: number = 3, lookaround: number = 50):
    Observable<api.Query['searchKnowledge']>
  {
    return this.apollo
        .watchQuery<api.Query['searchKnowledge']>({
          query: SEARCH_BOOK,
          variables: {string: string, limit: limit, lookaround: lookaround}})
        .valueChanges.pipe(map(r => r.data['searchKnowledge']));
  }

  searchProducts(limit: number = 10): Observable<api.Query['allProducts']> {
    return this.apollo.watchQuery<api.Query['allProducts']>( {
      query: GET_ALL_PRODUCTS
    }).valueChanges.pipe(map(r => r.data['allProducts']));
  }

  getProductDetails(id: number): Observable<api.Query['product']> {
    return this.apollo.watchQuery<api.Query['product']>({
      query: gql`
      query GetProductDetails($id: Int!) {
        product(id: $id) {
          id name tags description
        }
      }
      `,
      variables: {id: id}
    }).valueChanges.pipe(map(r => r.data['product']))
  }

  getIngredientById(id: number): Observable<api.Query['ingredient']> {
    return this.apollo.watchQuery<api.Query['ingredient']>({
      query: GET_INGREDIENT_BY_ID,
      variables: { id: id }
    }).valueChanges.pipe(map(r => r.data['ingredient']));
  }

  createOrderRequest(order: MutationCreateOrderArgs['order']): any {
    return this.apollo.mutate<api.Mutation['createOrder']>({
      mutation: gql`
        mutation CreateOrder($order: OrderArg!) {
          createOrder(order: $order)
        }
      `,
      variables: {order: order}
    }).pipe(map(r => r.data['createOrder']));
  }

  // TODO: fix
  createIngredientRequest(irequest: number[]): any {
    return this.apollo.mutate<api.Mutation['requestIngredient']>({
      mutation: gql`
        mutation requestIngredient($id: [Int]!) {
            id
        }
      `,
      variables: { ingredients: irequest }
    });
  }
}

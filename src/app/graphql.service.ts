import { Injectable } from '@angular/core';

import * as api from './api-types'

import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import {Observable, Subject} from 'rxjs';
import { map } from 'rxjs/operators';
import {MutationCreateOrderArgs, OrderArg} from "./api-types";


@Injectable({
  providedIn: 'root'
})
export class GraphqlService {
  constructor(private apollo: Apollo) { }

  getAllIngredients(): Observable<api.Query['allIngredients']> {
    return this.apollo
      .watchQuery<api.Query['allIngredients']>({
        query: gql`{
          allIngredients {
            id
            name
          }
        }`})
      .valueChanges.pipe(map(r => r.data['allIngredients']))
  }
  // createRequest()

  searchBooks(string: String, limit: number = 3, lookaround: number = 50):
    Observable<api.Query['searchKnowledge']>
  {
    return this.apollo
        .watchQuery<api.Query['searchKnowledge']>({
          query: gql`
            query SearchKnowledge($string: String!, $limit: Int!, $lookaround: Int!) {
              searchKnowledge(string: $string, limit: $limit, lookaround: $lookaround) {
                name content
              }
            }`,
          variables: {string: string, limit: limit, lookaround: lookaround}})
        .valueChanges.pipe(map(r => r.data['searchKnowledge']));
  }

  searchProducts(limit: number = 10): Observable<api.Query['allProducts']> {
    return this.apollo.watchQuery<api.Query['allProducts']>( {
      query: gql`
        { allProducts {id name description} }
      `
    }).valueChanges.pipe(map(r => r.data['allProducts']));
  }

  getProductDetails(id: number): Observable<api.Query['product']> {
    return this.apollo.watchQuery<api.Query['product']>({
      query: gql`
      query GetProductDetails($id: Int!) {
        product(id: $id) {
          id name description
        }
      }
      `,
      variables: {id: id}
    }).valueChanges.pipe(map(r => r.data['product']))
  }

  getIngredientById(id: number): Observable<api.Query['ingredient']> {
    return this.apollo.watchQuery<api.Query['ingredient']>({
      query: gql`
        query GetIngredientById($id: Int!) {
          ingredient(id: $id) {
            id
            name
            description
          }
        }
      `,
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
    });
  }
}

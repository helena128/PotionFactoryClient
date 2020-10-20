import { Injectable } from '@angular/core';

import * as api from './api-types'

import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import {Observable, Subject} from 'rxjs';
import { map } from 'rxjs/operators';
import {Credentials, MutationCreateOrderArgs, OrderArg, RequestArg} from "./api-types";
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

  currentUser(): Observable<api.Query['currentUser']> {
    return this.apollo
      .watchQuery<api.Query['currentUser']>({query: gql`{currentUser() { id }}`})
      .valueChanges.pipe(map(r => r.data['currentUser']))
  }

  loggedIn(): Observable<api.Query['loggedIn']> {
    return this.apollo
      .watchQuery<api.Query['loggedIn']>({query: gql`{loggedIn}`})
      .valueChanges.pipe(map(r => r.data['loggedIn']))
  }

  login(credentials: Credentials): Observable<api.Mutation['login']> {
    return this.apollo
      .mutate<api.Mutation['login']>({
        mutation: gql`
          mutation Login($creds: Credentials!) {
            login(credentials: $creds) {
              id name role
            }
          }`,
        variables: {creds: credentials}})
    .pipe(map(r => r.data['login']))
  }

  logout(): Observable<api.Mutation['logout']> {
    return this.apollo
      .mutate<api.Mutation['logout']>({
        mutation: gql`mutation Logout { logout }`
      })
    .pipe(map(r => r.data['logout']))
  }

  getAllIngredients(): Observable<api.Query['allIngredients']> {
    return this.apollo
      .watchQuery<api.Query['allIngredients']>({
        query: GET_ALL_INGREDIENTS})
      .valueChanges.pipe(map(r => r.data['allIngredients']))
  }

  searchBooks(string: String, limit: number = 3, lookaround: number = 50): Observable<api.Query['searchKnowledge']> {
    return this.apollo
        .watchQuery<api.Query['searchKnowledge']>({
          query: SEARCH_BOOK,
          variables: {string: string, limit: limit, lookaround: lookaround}})
        .valueChanges.pipe(map(r => r.data['searchKnowledge']))
  }

  getBook(id: Number): Observable<api.Query['getKnowledge']> {
    return this.apollo
      .watchQuery<api.Query['getKnowledge']>({
        query: gql`query GetKnowledge($id: Int!){ getKnowledge(id: $id) {id name kind content}}`,
        variables: {id: id}
      }).valueChanges.pipe(map(r => r.data['getKnowledge']))
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

  createOrderRequest(order: MutationCreateOrderArgs['order']): Observable<api.Mutation['createOrder']> {
    return this.apollo.mutate<api.Mutation['createOrder']>({
      mutation: gql`
        mutation CreateOrder($order: OrderArg!) {
          createOrder(order: $order)
        }
      `,
      variables: {order: order}
    }).pipe(map(r => r.data['createOrder']));
  }

  createIngredientRequest(irequest: RequestArg): any {
    return this.apollo.mutate<api.Mutation['requestIngredient']>({
      mutation: gql` mutation RequestIngredient($request: RequestArg!) {
        requestIngredient(request: $request) }`,
      variables: { request: irequest }
    }).pipe(map(r => r.data['requestIngredient']));
  }

  createReportRequest(reportRequest: number[]): Observable<any> {
    return this.apollo.mutate<api.Mutation['makeReport']>({
      mutation: gql`
      mutation MakeReport($products: [Int!]!) {
        makeReport(products: $products)
      }`,
      variables: { products: reportRequest }
    }).pipe(map(r => r.data['makeReport']));
  }

  getOrders(): Observable<api.Query['orders']> {
    return this.apollo
      .watchQuery<api.Query['orders']>({
        query: gql`
          { orders {id count product {name}} }
        `})
      .valueChanges.pipe(map(r => r.data['orders']));
  }
}

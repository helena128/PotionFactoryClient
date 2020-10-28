import { Injectable } from '@angular/core';

import * as api from './api-types'

import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import {from, NEVER, Observable, ObservableInput, of, Subject} from 'rxjs';
import {flatMap, map, mergeMap, publish, share, take} from 'rxjs/operators';
import {Credentials, Knowledge, Mutation, MutationCreateOrderArgs, OrderArg, RecipeArg, RequestArg} from "./api-types";
import {ToastrService} from "ngx-toastr";
import {
  CREATE_ORDER_REQUEST,
  GET_ALL_INGREDIENTS,
  GET_ALL_PRODUCTS,
  GET_INGREDIENT_BY_ID,
  GET_PRODUCT_DETAILS,
  SEARCH_BOOK
} from "./graphql-constants";
import {Router} from "@angular/router";
import {GraphQLError} from "graphql";
import {ApolloQueryResult, MutationOptions} from "apollo-client";
import {WatchQueryOptions} from "apollo-angular/types";
import {FetchResult} from "apollo-link";
// import {ObservedValueOf, OperatorFunction, SubscribableOrPromise} from "rxjs/src/internal/types";
// import {Option} from "@angular/cli/models/interface";


@Injectable({
  providedIn: 'root'
})
export class GraphqlService {
  constructor(private apollo: Apollo,
              private toastr: ToastrService,
              private router: Router) {
  }

  private errorHandler<T>(defaultValue: T | null = null) {
    return mergeMap((r: ApolloQueryResult<T> | FetchResult<T>): ObservableInput<ApolloQueryResult<T> | FetchResult<T>> => {
        var errors = [];
        var promise;

        loop:
          for (const e of (r?.errors || [])) {
            let msg = e.message
            let code = e.extensions?.code
            switch (code) {
              case 'UNAUTHENTICATED':
                this.toastr.error(msg)
                promise = this.router.navigate(['login'])
                break loop;
              case 'FORBIDDEN':
              case 'DB_ERROR':
              case 'SERVER_ERROR':
                errors.push(e);
              // FALLTHROUGH
              case 'BAD_USER_INPUT':
                this.toastr.error(msg)
                break;
              default:
                errors.push(e)
            }
          }

        if (promise) {
          return from(promise!).pipe(flatMap(() => NEVER))
        } else if (errors.length > 0) {
          return NEVER
        } else {
          r.errors = []
          return of(r)
        }
      }
    )
  }

  private watchQuery<T extends keyof api.Query, Variables>(
    field: T,
    options: WatchQueryOptions<Variables>
  ): Observable<any> {
    return this.apollo.watchQuery<api.Query[T]>(options)
      .valueChanges
      .pipe(
        this.errorHandler(),
        map(r => r.data[field as string]),
        share())
  }

  private mutate<T extends keyof api.Mutation, Variables>(
    field: T,
    options: MutationOptions<Mutation[T], Variables>
  ) {
    return this.apollo.mutate<api.Mutation[T]>(options)
      .pipe(
        this.errorHandler(),
        map(r => r.data[field as string]),
        share())
  }

  currentUser(): Observable<api.Query['currentUser']> {
    return this.watchQuery('currentUser', {query: gql`{currentUser { id name phone address }}`})
  }

  loggedIn(): Observable<api.Query['loggedIn']> {
    return this.watchQuery('loggedIn', {query: gql`{loggedIn}`})
  }

  login(credentials: Credentials): Observable<api.Mutation['login']> {
    return this.mutate('login', {
      mutation: gql`
        mutation Login($creds: Credentials!) {
          login(credentials: $creds) {
            id name role
          }
        }`,
      variables: {creds: credentials}
    })
  }

  logout(): Observable<api.Mutation['logout']> {
    return this.mutate('logout', {
      mutation: gql`mutation Logout { logout }`
    })
  }

  getAllIngredients(): Observable<api.Query['allIngredients']> {
    return this.watchQuery('allIngredients', {query: GET_ALL_INGREDIENTS})
  }

  searchBooks(string: String, limit: number = 3, lookaround: number = 50): Observable<api.Query['searchKnowledge']> {
    return this.watchQuery('searchKnowledge', {
      query: SEARCH_BOOK,
      variables: {string: string, limit: limit, lookaround: lookaround},
    })
  }

  getBook(id: Number): Observable<api.Query['getKnowledge']> {
    return this.watchQuery('getKnowledge', {
      query: gql`query GetKnowledge($id: Int!){ getKnowledge(id: $id) {id name kind content}}`,
      variables: {id: id}
    })
  }

  searchProducts(limit: number = 10): Observable<api.Query['allProducts']> {
    return this.watchQuery('allProducts', {
      query: GET_ALL_PRODUCTS
    })
  }

  getProductDetails(id: number): Observable<api.Query['product']> {
    return this.watchQuery('product', {
      query: gql`
        query GetProductDetails($id: Int!) {
          product(id: $id) {
            id name tags description
          }
        }
      `,
      variables: {id: id}
    })
  }

  getIngredientById(id: number): Observable<api.Query['ingredient']> {
    return this.watchQuery('ingredient', {
      query: GET_INGREDIENT_BY_ID,
      variables: {id: id}
    })
  }

  createOrderRequest(order: MutationCreateOrderArgs['order']): Observable<api.Mutation['createOrder']> {
    return this.mutate('createOrder', {
      mutation: gql`
        mutation CreateOrder($order: OrderArg!) {
          createOrder(order: $order)
        }`,
      variables: {order: order}
    })
  }

  createIngredientRequest(irequest: RequestArg): any {
    return this.mutate('requestIngredient', {
      mutation: gql` mutation RequestIngredient($request: RequestArg!) {
        requestIngredient(request: $request) }`,
      variables: {request: irequest}
    })
  }

  createReportRequest(reportRequest: number[]): Observable<any> {
    return this.mutate('makeReport', {
      mutation: gql`
        mutation MakeReport($products: [Int!]!) {
          makeReport(products: $products)
        }`,
      variables: {products: reportRequest}
    })
  }

  getOrders(): Observable<api.Query['orders']> {
    return this.watchQuery('orders', {query: gql` { orders {id count product {name}} }`, fetchPolicy: 'no-cache'});
  }

  userById(id: string): Observable<api.Query['user']> {
    return this.watchQuery('user', {
      query: gql`
        query GetUserById($id: String!) {
          user(id: $id) {
            id
            name
            phone
            address
            role
            status
          }
        }`
    })
  }

  updateUserOwnProfile(user: any) {
    return this.mutate('updateUserSelf', {
      mutation: gql`
        mutation UpdateUserSelf($user: UserChange!) {
          updateUserSelf(user: $user) {
            id name phone address
          }
        }
      `,
      variables: {user: user}
    })
  }

  getIngredients(): Observable<api.Query['allIngredients']> {
    return this.watchQuery('allIngredients', {
      query: gql`{
        allIngredients {
          id
          name
        }
      }
      `
    });
  }

  createRecipe(recipe: any): Observable<api.Mutation['createRecipe']> {
    return this.mutate('createRecipe', {
      mutation: gql`
      mutation CreateRecipe($recipe: RecipeArg!) {
        createRecipe(recipe: $recipe) {
          name description ingredients { id }
        }
      }
      `,
      variables: {recipe: recipe}
    });
  }

  getAllRecipes(): Observable<api.Query['allRecipes']> {
    return this.watchQuery('allRecipes', {
      query: gql`{
        allRecipes {
          id name ingredients { name }
        }
      }
      `,
      fetchPolicy: 'no-cache'
    });
  }

  register(user: any): Observable<api.Mutation['signup']> {
    return this.mutate('signup', {
      mutation: gql`
        mutation signup($user: userSignup!) {
          signup(user: $user) {
            id name phone address
          }
        }
      `,
      variables: {user : user}
    });
  }

  getUsers(): Observable<api.Query['allUsers']> {
    return this.watchQuery('allUsers', {
      query: gql`
        {
          allUsers {
            id name role
          }
        }
      `,
      fetchPolicy: 'no-cache'
    });
  }

  createUser(user: any): Observable<api.Mutation['createUser']> {
    return  this.mutate('createUser', {
      mutation: gql`
          mutation CreateUser($user: userEdit!) {
          createUser(user: $user) {
            id
          }
        }
      `,
      variables: {user: user}
    });
  }
}

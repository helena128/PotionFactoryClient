import { Injectable } from '@angular/core';

import * as api from './api-types'

import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import {Observable, Subject} from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class GraphqlService {
  constructor(private apollo: Apollo) { }

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
}

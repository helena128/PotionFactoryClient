import { Component, OnInit } from '@angular/core';

// import {Book} from "../model/book";
// import { Apollo } from 'apollo-angular';
// import gql from 'graphql-tag';
// import { map } from 'rxjs/operators';

import {Observable} from 'rxjs';
import {Knowledge, Query} from '../api-types'
import {GraphqlService} from '../graphql.service'

@Component({
  selector: 'app-search-books',
  templateUrl: './search-books.component.html',
  styleUrls: ['./search-books.component.scss']
})
export class SearchBooksComponent implements OnInit {
  results: Observable<Query['searchKnowledge']>

  constructor(private api: GraphqlService) {}
  ngOnInit() {}

  search(s: String) {
    this.results = this.api.searchBooks(s)
  }
}

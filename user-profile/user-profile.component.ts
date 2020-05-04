import { Component, OnInit } from '@angular/core';
import {User, Query} from '../api-types'

// TODO: Why cant we import this from AppolloModule/GraphQLModule?
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
// import { ApolloModule } from "../graphql.module";
// import {  } from "../app.module";


import {Observable} from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})

export class UserProfileComponent implements OnInit {
  user: Observable<User>
  constructor(private apollo: Apollo) {}

  id = "client"
  query =
    gql`
      query GetUser($id: String!){
        user(id: $id) {
            id name email phone address role
        }
      }
    `

  ngOnInit(): void {
    this.user =
      this.apollo
        .watchQuery<{user: User}>({
          query: this.query,
          variables: {
            id: this.id
          }})
        .valueChanges.pipe(map(r => r.data.user))
  }
}

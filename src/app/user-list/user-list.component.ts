import {Component, OnInit} from '@angular/core';
import {User} from "../api-types";
import {GraphqlService} from "../graphql.service";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  userList: User[];

  constructor(private graphQlService: GraphqlService) {
  }

  ngOnInit(): void {
    this.graphQlService.getUsers().subscribe(data => this.userList = data);
  }

}

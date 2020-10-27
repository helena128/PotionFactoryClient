import { Component, OnInit } from '@angular/core';
import {GraphqlService} from "../graphql.service";
import {AuthHandlerService} from "../auth-handler.service";
import {UserRole} from "../api-types";

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnInit {

  orders: any[];
  ACCEPTED_ROLES = [UserRole.Client];

  constructor(private graphqlService: GraphqlService, private authHandler: AuthHandlerService) {
  }

  ngOnInit(): void {
    this.authHandler.checkRole(this.ACCEPTED_ROLES);
    this.retrieveOrders();
  }

  private retrieveOrders() {
    this.graphqlService.getOrders().subscribe(data => this.orders = data);
  }

}

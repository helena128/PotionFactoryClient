import { Component, OnInit } from '@angular/core';
import {GraphqlService} from "../graphql.service";

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnInit {

  orders: any[];

  constructor(private graphqlService: GraphqlService) { }

  ngOnInit(): void {
    // TODO: message on empty results
    this.graphqlService.getOrders().subscribe(data => this.orders = data);
  }

}

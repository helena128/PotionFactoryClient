import {Component, OnInit} from '@angular/core';
import {UserRole} from "../model/user-role";
import {Product} from "../api-types";
import {GraphqlService} from "../graphql.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  public userRole: UserRole = UserRole.User; // TODO: change
  public amountOptions: Array<number>;
  public product: Product;
  private id: number;

  constructor(private service: GraphqlService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.initAmountArray();
    this.id = Number.parseInt(this.route.snapshot.paramMap.get('id'));
    this.service.getProductDetails(this.id).subscribe((data) => this.product = data);
  }

  private initAmountArray(): void {
    this.amountOptions = Array.from(Array(10).keys());
  }

}

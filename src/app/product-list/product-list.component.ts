import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {GraphqlService} from "../graphql.service";
import {Product, UserRole} from "../api-types";
import {AuthHandlerService} from "../auth-handler.service";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  ACCEPTABLE_ROLES = [UserRole.Client, UserRole.WorkshopManager];
  productList: Product[];

  constructor(private router: Router, private route: ActivatedRoute, private service: GraphqlService,
              private authHandler: AuthHandlerService) { }

  ngOnInit(): void {
    this.authHandler.checkRole(this.ACCEPTABLE_ROLES);
    this.service.searchProducts(10).subscribe((data) => this.productList = data);
  }

  getTagList(product: Product): string {
    return product.tags.slice(0, 2).join(', ');
  }
}

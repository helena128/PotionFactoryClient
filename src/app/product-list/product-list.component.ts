import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {GraphqlService} from "../graphql.service";
import {Product} from "../api-types";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  productList: Product[];

  constructor(private router: Router, private route: ActivatedRoute, private service: GraphqlService) { }

  ngOnInit(): void {
    this.service.searchProducts(10).subscribe((data) => this.productList = data);
  }
}

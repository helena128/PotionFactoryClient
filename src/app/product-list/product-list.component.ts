import { Component, OnInit } from '@angular/core';
import {Product} from "../model/product";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  public productList: Array<Product>;

  constructor() { }

  ngOnInit(): void {
    this.initSampleProducts();
  }

  private initSampleProducts(): void {
    this.productList = new Array<Product>();
    this.productList.push(
      {
        id: 1,
        productName: "Product 1",
        mainFeatures: ["FeatureOne", "FeatureTwo"],
        description: null
      } as Product,
      {
        id: 2,
        productName: "Product 2",
        mainFeatures: ["FeatureOne", "FeatureThree"],
        description: null
      } as Product,
      {
        id: 3,
        productName: "Product 3",
        mainFeatures: ["FeatureThree", "FeatureFour"],
        description: null
      } as Product
    );
  }
}

import {Component, OnInit} from '@angular/core';
import {UserRole} from "../model/user-role";
import {MutationCreateOrderArgs, Product} from "../api-types";
import {GraphqlService} from "../graphql.service";
import {ActivatedRoute} from "@angular/router";
import {FormBuilder, FormGroup} from "@angular/forms";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  public userRole: UserRole = UserRole.User; // TODO: change
  public product: Product;
  private id: number;

  countForm: FormGroup;
  amountOptions = [1, 2, 3, 4, 5]

  constructor(private service: GraphqlService,
              private route: ActivatedRoute,
              private fb: FormBuilder,
              private toastr: ToastrService
              ) {}

  ngOnInit(): void {
    this.id = Number.parseInt(this.route.snapshot.paramMap.get('id'));
    this.service.getProductDetails(this.id).subscribe((data) => this.product = data);
    this.countForm = this.fb.group({
      countControl: [ 1 ]
    });
  }

  public createRequest(): void {
    var count = this.countForm.controls['countControl'].value;

    // TODO: redo - get username and send product_id instead of product
    var order = {
      orderedBy: 'client',
      product: 1,
      count: count
    } as MutationCreateOrderArgs['order'];

    this.service.createOrderRequest(order).subscribe(data => {
      let order_id = data?.data?.createOrder
      if (order_id) this.toastr.success("Order " + data?.data?.createOrder + " is created")
      else this.toastr.error("Failed to create order")
    })
  }
}

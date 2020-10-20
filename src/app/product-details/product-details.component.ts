import {Component, OnInit} from '@angular/core';
import {MutationCreateOrderArgs, Product, UserRole} from "../api-types";
import {GraphqlService} from "../graphql.service";
import {ActivatedRoute} from "@angular/router";
import {FormBuilder, FormGroup} from "@angular/forms";
import { ToastrService } from 'ngx-toastr';
import {AuthHandlerService} from "../auth-handler.service";

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  public userRole: UserRole;
  public UserRoles = UserRole;
  public product: Product;
  private id: number;
  private ACCEPTED_ROLES = [UserRole.Client];

  countForm: FormGroup;
  amountOptions = [1, 2, 3, 4, 5];

  constructor(private service: GraphqlService,
              private route: ActivatedRoute,
              private fb: FormBuilder,
              private toastr: ToastrService,
              private authHandler: AuthHandlerService
              ) {}

  ngOnInit(): void {
    this.userRole = localStorage.getItem('userRole') as UserRole;
    this.authHandler.checkRoles(this.userRole, this.ACCEPTED_ROLES);
    this.id = Number.parseInt(this.route.snapshot.paramMap.get('id'));
    this.service.getProductDetails(this.id).subscribe((data) => this.product = data);
    this.countForm = this.fb.group({
      countControl: [ 1 ]
    });
  }

  public createRequest(): void {
    var count = Number.parseInt(this.countForm.controls['countControl'].value);

    var order = {
      orderedBy: 'client',
      product: 1,
      count: count
    } as MutationCreateOrderArgs['order'];

    this.service.createOrderRequest(order).subscribe(orderId => {
      if (orderId) {
        this.toastr.success("Order " + orderId + " is created");
      } else {
        this.toastr.error("Failed to create order")
      }
    });
  }
}

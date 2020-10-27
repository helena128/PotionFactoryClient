import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {GraphqlService} from "../graphql.service";
import {Credentials, UserRole} from "../api-types";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: String;

  constructor(
    private api: GraphqlService,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router) {
    // redirect to home if already logged in

    api.loggedIn()
      .subscribe(v => { if (v) this.openPageForRole() })
  }

  openPageForRole() {
    let role = localStorage.getItem('userRole')
    var route;

    switch (role) {
      case null: route = ['login']; break
      case UserRole.Client: route = ['products']; break
      case UserRole.Fairy: route = ['books']; break
      case UserRole.Admin: throw "Not implemented"
      case UserRole.WorkshopManager: route = ['ingredients']; break
      case UserRole.WarehouseManager: throw "Not Implemented"; break
      default: throw "Unknown role " + role
    }

    this.router.navigate(route)
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) return;
    this.loading = true;

    let f = this.loginForm.value
    this.api.login({id: f.username, password: f.password} as Credentials)
      .subscribe(v => {
        if (v) {
          localStorage.setItem('userRole', v.role)
          this.openPageForRole()
        }
        else {
          this.toastr.error("Wrong login or password")
          this.submitted = false
          this.loading = false
        }})
  }

}

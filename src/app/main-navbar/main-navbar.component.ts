import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {GraphqlService} from "../graphql.service";
import {UserRole} from "../api-types";

@Component({
  selector: 'app-main-navbar',
  templateUrl: './main-navbar.component.html',
  styleUrls: ['./main-navbar.component.scss']
})
export class MainNavbarComponent implements OnInit {
  public userRole: UserRole = UserRole.Client;

  public headers: Array<Header>;

  constructor(
    private api: GraphqlService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    let role = localStorage.getItem('userRole')
    if (!role) this.router.navigate(['login'])

    this.userRole = role as UserRole
    this.initUserRoles();
  }

  public navigate(link: string): void {
    this.router.navigate([link]);
  }

  public exit(): void {
    this.api.logout()
      .subscribe(v => {
        // if (v) {
          localStorage.removeItem('userRole')
          this.router.navigate(['login'])
        // }
  })
  }

  private initUserRoles(): void {
    this.headers = new Array<Header>();
    this.headers.push({
      name: "Home",
      link: "home"
    });
    switch (this.userRole) {
      case UserRole.Client:
        this.headers.push(
          {
            name: "Products",
            link: "products"
          },
          {
            name: "Orders",
            link: "orders"
          });
        break;
      case UserRole.Admin:
        this.headers.push(
          {
            name: "Users",
            link: "users"
          });
        break;
      case UserRole.Fairy:
        this.headers.push(
          {
            name: "Literature",
            link: "books"
          },
          {
            name: 'Recipes',
            link: 'recipes'
          });
        break;
      case UserRole.WarehouseManager:
        this.headers.push({
          name: "Ingredients Request",
          link: "ingredients"
        },
          {
            name: "Product Transfer",
            link: "transfer"
          });
        break;
      case UserRole.WorkshopManager:
        this.headers.push(
          {
            name: 'Ingredient request', link: 'ingredients'
          },
          {
            name: 'Product Transfer', link: 'transfer'
          },
          {
            name: 'Products', link: 'products'
          });
    }
  }
}

class Header {
  name: string;
  link: string;
}

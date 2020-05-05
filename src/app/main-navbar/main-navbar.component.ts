import {Component, OnInit} from '@angular/core';
import {UserRole} from "../model/user-role";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-main-navbar',
  templateUrl: './main-navbar.component.html',
  styleUrls: ['./main-navbar.component.scss']
})
export class MainNavbarComponent implements OnInit {

  public userRole: UserRole = UserRole.WorkshopOperator;

  public headers: Array<Header>;

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.initUserRoles();
  }

  public navigate(link: string): void {
    this.router.navigate([link]/*, {relativeTo: this.route}*/)
  }

  public exit(): void {
    console.debug('Exiting');
  }

  private initUserRoles(): void {
    this.headers = new Array<Header>();
    this.headers.push({
      name: "Home",
      link: ""
    });
    switch (this.userRole) {
      case UserRole.User:
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
      case UserRole.Administrator:
        this.headers.push(
          {
            name: "Users",
            link: "users"
          });
        break;
      case UserRole.FairyGodmother:
        this.headers.push(
          {
            name: "Literature",
            link: "books"
          });
        break;
      case UserRole.WareHouseOperator:
        //this.headers.push("Accept request"); // TODO: later
        break;
      case UserRole.WorkshopOperator:
        this.headers.push(
          {
            name: "Request Ingredients",
            link: "ingredients"
          },
          {
            name: "Manufacture Report", link: "report"
          });
    }
  }
}

class Header {
  name: string;
  link: string;
}

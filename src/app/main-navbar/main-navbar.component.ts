import {Component, OnInit} from '@angular/core';
import {UserRole} from "../model/user-role";

@Component({
  selector: 'app-main-navbar',
  templateUrl: './main-navbar.component.html',
  styleUrls: ['./main-navbar.component.scss']
})
export class MainNavbarComponent implements OnInit {

  private userRole: UserRole = UserRole.User;

  public headers: Array<String>;

  constructor() { }

  ngOnInit(): void {
    this.initUserRoles();
  }

  private initUserRoles(): any {
    this.headers = new Array<String>();
    this.headers.push("Home");
    switch (this.userRole) {
      case UserRole.User:
        this.headers.push("Products", "Orders");
        break;
      case UserRole.Administrator:
        this.headers.push("Users");
        break;
      case UserRole.FairyGodmother:
        this.headers.push("Literature");
        break;
      case UserRole.WareHouseOperator:
        this.headers.push("Accept request");
        break;
      case UserRole.WorkshopOperator:
        this.headers.push("Request Ingredients", "Manufacture Report");
    }
  }

}

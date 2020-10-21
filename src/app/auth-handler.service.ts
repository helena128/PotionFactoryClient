import { Injectable } from '@angular/core';
import {Router} from "@angular/router";
import {UserRole} from "./api-types";

@Injectable({
  providedIn: 'root'
})
export class AuthHandlerService {

  constructor(private router: Router) { }

  public checkRoles(currentUserRole: UserRole, acceptedUserRoles: UserRole[]) {
    const match = acceptedUserRoles.filter(userRole => userRole === currentUserRole);
    if (match === undefined || match === null || match.length === 0) {
      this.router.navigate(['not-found']);
    }
  }

  public checkRole(acceptedRoles: UserRole[]): void {
    const userRole = localStorage.getItem('userRole') as UserRole;
    this.checkRoles(userRole, acceptedRoles);
  }
}

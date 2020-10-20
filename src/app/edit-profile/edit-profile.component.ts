import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {UserRole} from "../api-types";
import {FormBuilder, FormGroup} from "@angular/forms";
import {User} from "../model/user";

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {
  isCreateProfile: boolean = false;
  isEditCurrentProfile: boolean = false;
  isRegister: boolean = false;
  userRoleGroup: FormGroup;
  userRoles = [UserRole.Client, UserRole.Admin, UserRole.Fairy, UserRole.WarehouseManager, UserRole.WorkshopManager];
  user = {
    id: 1,
    userName: 'John Smith',
    email: 'johnsmith@yandex.ru',
    password: 'Password123!',
    address: '2 Yellowstone Str, Twin Peaks, Washington',
    phone: '+1 (999) 0051578',
    role: UserRole.WarehouseManager
  }

  constructor(private route: ActivatedRoute, private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    /*let id = Number.parseInt(this.route.snapshot.paramMap.get('id'))
    if (!id) {
      this.isCreateProfile = true;
    }
    this.userRoleGroup = this.fb.group({
      userRoleControl: [ UserRole.WarehouseManager ]
    });
    this.userRoleGroup.valueChanges.subscribe(x => console.log(x));*/
    this.isEditCurrentProfile = this.router.url === '/settings';
    this.isRegister = this.router.url === '/register';
  }

  handleUserRoleChange(event: any) {
    console.log(event);
  }

  public getHeader(): string {
    if (this.isCreateProfile) {
      return 'Create user';
    }
    if (this.isEditCurrentProfile) {
      return 'Edit settings';
    }
    if (this.isRegister) {
      return 'Enter your registration info';
    }
    return 'Edit profile';
  }

  public getSaveButtonCaption(): string {
    if (this.isCreateProfile) {
      return 'Create user';
    }
    if (this.isRegister) {
      return 'Sign up';
    }
    return 'Save changes';
  }

}

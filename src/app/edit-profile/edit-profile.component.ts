import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
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

  constructor(private route: ActivatedRoute, private fb: FormBuilder) { }

  ngOnInit(): void {
    let id = Number.parseInt(this.route.snapshot.paramMap.get('id'))
    if (!id) {
      this.isCreateProfile = true;
    }
    this.userRoleGroup = this.fb.group({
      userRoleControl: [ UserRole.WarehouseManager ]
    });
    if (!this.isCreateProfile) {
      this.userRoleGroup.value = this.user.role;
    }
    this.userRoleGroup.valueChanges.subscribe(x => console.log(x));
  }

  handleUserRoleChange(event: any) {
    console.log(event);
  }

}

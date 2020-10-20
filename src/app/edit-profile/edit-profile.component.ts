import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {UserRole} from "../api-types";
import {FormBuilder, FormGroup} from "@angular/forms";
import {GraphqlService} from "../graphql.service";

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
  user: any;
  userRole: UserRole;

  constructor(private route: ActivatedRoute, private fb: FormBuilder, private router: Router, private graphqlService: GraphqlService) { }

  ngOnInit(): void {
    this.userRole = localStorage.getItem('userRole') as UserRole;
/*    let id = Number.parseInt(this.route.snapshot.paramMap.get('id'));
    if (!id) {
      this.isCreateProfile = true;
    }*/
    this.userRoleGroup = this.fb.group({
      userRoleControl: [ UserRole.WarehouseManager ]
    });
    this.userRoleGroup.valueChanges.subscribe(x => console.log(x));

    this.isEditCurrentProfile = (this.router.url === '/settings');
    this.isRegister = this.router.url === '/register';

    // init user
    if (this.isEditCurrentProfile) {
      this.graphqlService.currentUser().subscribe(data => this.user = data); // TODO: fix this
    }
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

  public saveChanges(): void {
    this.graphqlService.updateUserOwnProfile({
      password: this.user.password,
      address: this.user.address,
      phone: this.user.phone
    }).subscribe(data => this.user = data);
  }

}

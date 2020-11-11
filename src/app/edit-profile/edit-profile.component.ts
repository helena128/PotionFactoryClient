import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {User, UserRole, UserStatus} from "../api-types";
import {FormBuilder, FormGroup} from "@angular/forms";
import {GraphqlService} from "../graphql.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {
  isCreateProfile: boolean = false;
  isEditCurrentProfile: boolean = false;
  isRegister: boolean = false;
  isEditUserProfile: boolean = false;
  userRoleGroup: FormGroup;
  userRoles = [UserRole.Client, UserRole.Admin, UserRole.Fairy, UserRole.WarehouseManager, UserRole.WorkshopManager];
  user: any;
  userRole: UserRole;

  constructor(private route: ActivatedRoute,
              private fb: FormBuilder,
              private router: Router,
              private graphqlService: GraphqlService,
              private toasterService: ToastrService) {
  }

  ngOnInit(): void {
    this.userRole = localStorage.getItem('userRole') as UserRole;
    this.isEditCurrentProfile = (this.router.url === '/settings');
    this.isRegister = this.router.url === '/register';
    this.isCreateProfile = (this.route.snapshot.paramMap.get('id') === 'new' && this.userRole === UserRole.Admin);
    this.isEditUserProfile = !(this.isEditCurrentProfile || this.isCreateProfile || this.isRegister) && this.userRole === UserRole.Admin;

    console.debug('isCreateProfile: ', this.isCreateProfile);
    // init user
    if (this.isEditCurrentProfile) {
      this.graphqlService.currentUser().subscribe(data => this.user = data);
    } else if (this.isRegister || this.isCreateProfile) {
      this.userRoleGroup = this.fb.group({
        userRoleControl: [UserRole.WarehouseManager]
      });
      this.user = {name: '', password: '', address: '', phone: '', id: ''};
    } else if (this.isEditUserProfile) {
      const userId = this.route.snapshot.paramMap.get('id');
      console.log('Retrieving data for user: ', userId);
      this.graphqlService.userById(userId).subscribe(data => {
        this.user = data;
        console.debug('User role: ', this.user.role);
        this.userRoleGroup = this.fb.group({
          userRoleControl: [this.user.role]
        });
      });
    }
    //this.userRoleGroup.valueChanges.subscribe(x => console.log(x));

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
    if (!this.isRequestValid()) {
      this.toasterService.error('Check required fields are filled out!');
      return;
    }
    if (this.isEditCurrentProfile) {
      const updatedUser = {
        address: this.user.address,
        phone: this.user.phone,
        id: this.user.id
      };
      if (this.user.password && this.user.password?.length > 0) {
        updatedUser['password'] = this.user.password;
      }
      console.debug('Updated user: ', updatedUser);
      this.graphqlService.updateUserOwnProfile(updatedUser).subscribe(data => this.user = data);
    } else if (this.isRegister) {
      const newUser = {
        id: this.user.id,
        password: this.user.password,
        name: this.user.name,
        phone: this.user.phone,
        address: this.user.address
      };
      console.debug(newUser);
      this.graphqlService.register(newUser).subscribe(data => this.toasterService.success(`Registered new user ${(data as User)?.id}`));
    } else if (this.isCreateProfile) {
      const newUser = {
        id: this.user.id,
        password: this.user.password,
        name: this.user.name,
        phone: this.user.phone,
        address: this.user.address,
        role: this.userRoleGroup.value.userRoleControl as UserRole
      };
      console.debug(newUser.role);
      this.graphqlService.createUser(newUser).subscribe(data => this.toasterService.success(`User was created, email: ${(data as User)?.id}`));
    } else if (this.isEditUserProfile) {
      console.debug('Updating user with id: ', this.user.id);
      const updatedUser = {
        id: this.user.id,
        name: this.user.name,
        phone: this.user.phone,
        address: this.user.address,
        role: this.userRoleGroup.value.userRoleControl as UserRole,
        password: ''
      };
      this.graphqlService.updateUser(updatedUser).subscribe(data => this.toasterService.success(`User with email ${(data as User)?.id} was updated`));
    }
  }

  deactivateUser() {
    console.log('Deactivate user called');
    if (this.isEditUserProfile && this.user?.status === 'Active') {
      console.debug('Deactivting user');
      this.graphqlService.deactivate(this.user.id as string).subscribe(data => {
        if (data) {
          this.toasterService.success('Successfully deactivated user');
          this.user.status = UserStatus.Deactivated;
        } else {
          this.toasterService.error('Couldn\'t update user');
        }
      });
    }
  }

  isDeactivated(): boolean {
    return this.user.status === UserStatus.Deactivated;
  }

  private isRequestValid(): boolean {
    return this.isNonEmptyString(this.user.id) && this.isNonEmptyString(this.user.name) &&
      this.isValidEmail(this.user.id);
  }

  private isNonEmptyString(str: string): boolean {
    return str && str.length > 0 && !/^\s+$/.test(str);
  }

  private isValidEmail(id: string) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(id).toLowerCase());
  }
}

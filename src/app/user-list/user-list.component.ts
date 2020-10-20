import {Component, OnInit} from '@angular/core';
import {UserRole} from "../api-types";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  profileList = [{
    id: 1,
    userName: 'John Smith',
    email: 'johnsmith@yandex.ru',
    password: 'Password123!',
    address: '2 Yellowstone Str, Twin Peaks, Washington',
    phone: '+1 (999) 0051578',
    role: UserRole.WarehouseManager
  },
    {
      id: 2,
      userName: 'Fairy Godmother',
      email: 'fairy@farfaraway.com',
      password: 'Password123!',
      address: '2 Yellowstone Str, Far-away Land',
      phone: '+1 (999) 0051578',
      role: UserRole.Fairy
    },
    {
      id: 3,
      userName: 'John Doe',
      email: 'johndoe@yandex.ru',
      password: 'Password123!',
      address: '2 Yellowstone Str, Far-away Land',
      phone: '+1 (999) 0051578',
      role: UserRole.Client
    }]

  constructor() {
  }

  ngOnInit(): void {
  }

}

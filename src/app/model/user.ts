import {UserRole} from "../api-types";

export class User {
  userId: number;
  userName: string;
  email: string;
  password: string;
  address: string;
  phone: string;
  userRole: UserRole;
}

import {UserType} from "../../../@core/userType";

export class User {
  id: number;
  createdAt: Date;
  batch: string;
  email: string;
  fullName: string;
  password: string;
  confirmPassword: string;
  username: string;
  status: string;
  roleType: UserType;
}

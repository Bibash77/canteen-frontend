import {UserType} from '../../../@core/userType';

export class User {
  id: number;
  createdAt: Date;
  batch: string;
  email: string;
  fullName: string;
  password: string;
  confirmPassword: string;
  userName: string;
  status: string;
  roleType: UserType;
  userCode: string;
}

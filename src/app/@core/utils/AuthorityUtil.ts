import { LocalStorageUtil} from './local-storage-util';
import {UserType} from '../userType';
import {Status} from '../Status';

export class AuthorityUtil {
   static checkAdmin(): boolean {
    const localStorage = LocalStorageUtil.getStorage();
    return localStorage.roleType === UserType.ADMIN;
  }
  static checkStudent(): boolean {
    const localStorage = LocalStorageUtil.getStorage();
    return localStorage.roleType === UserType.STUDENT;
  }


  static checkKitchener(): boolean {
    const localStorage = LocalStorageUtil.getStorage();
    return localStorage.roleType === UserType.KITCHENER;
  }

  static isOrderable(itemAmount: number): boolean {
    const localStorage = LocalStorageUtil.getStorage();
    return Number(localStorage.currentBalance) > (itemAmount);
  }

  static isUserActive() {
    const localStorage = LocalStorageUtil.getStorage();
    return localStorage.status.toString() === Status.ACTIVE.toString();
  }
}

import {ObjectUtil} from './ObjectUtil';
import * as CryptoJS from 'crypto-js';
export class LocalStorageUtil {

  public static getStorage(): LocalStorage {
    return ObjectUtil.isEmpty(localStorage.getItem(environment.LOCAL_STORAGE_NAME)) ? new LocalStorage()
: JSON.parse(CryptoUtil.decrypt(localStorage.getItem(environment.LOCAL_STORAGE_NAME)));
  }


  public static setStorage(data: LocalStorage): void {
    localStorage.setItem(environment.LOCAL_STORAGE_NAME, CryptoUtil.encrypt(JSON.stringify(data)));
  }

  public static clearStorage(): void {
    LocalStorageUtil.setStorage(new LocalStorage());
  }
}
export class LocalStorage {
  at: string;
  rt: string;
  ty: string;
  et: string;
  username: string;
  roleName: string;
  roleType: string;
  userId: string;
  currentBalance: string;
  status: string;
  userCode: string;
  fullName: string;
  productMode: string;
}

export class CryptoUtil {
  public static encrypt(data: any): string {
    return CryptoJS.AES.encrypt(data, environment.LOCAL_STORAGE_KEY).toString();
  }

  public static decrypt(data: any): string {
    return CryptoJS.AES.decrypt(data, environment.LOCAL_STORAGE_KEY).toString(CryptoJS.enc.Utf8);
  }
  }

export const environment = {
  production: false,
  client: 'Divya gyan college',
  LOCAL_STORAGE_KEY: 'QP\'`0tWfyBni^(*rv0gB].ck$s@z(!',
  LOCAL_STORAGE_NAME: 'BibashCanteenApp'
};

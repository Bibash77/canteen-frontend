import {NbIconConfig} from '@nebular/theme';
import {LocalStorage, LocalStorageUtil} from "./local-storage-util";

export class OtherUtils {

  static batchGenerator() {
    const totalYear = [];
    let year = 2018;
    const currentYear = new Date().getFullYear();
    while (year < currentYear) {
      totalYear.push(year.toString());
      year++;
    }
    return totalYear;
  }

  static getIconConfig(iconName) {
    const iconConfig: NbIconConfig  = { icon: iconName, pack: 'eva' };
    return iconConfig;
  }

  static resetUserWallet(deductBalance){
    const  localStorage: LocalStorage = LocalStorageUtil.getStorage();
    localStorage.currentBalance = (Number(localStorage.currentBalance) - deductBalance).toString();
    LocalStorageUtil.setStorage(localStorage);
  }
}

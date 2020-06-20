import {NbIconConfig} from '@nebular/theme';

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
}

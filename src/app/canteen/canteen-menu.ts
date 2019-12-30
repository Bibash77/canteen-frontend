import {NbMenuItem} from '@nebular/theme';

export const MENU_ITEMS: Map<string, NbMenuItem> = new Map([
  ['Dashboard', {
    title: 'Dashboard',
    icon: 'home-outline',
    link: '/canteen/dashboard',
    home: true,
  }],
]);

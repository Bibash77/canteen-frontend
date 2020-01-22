import {NbMenuItem} from '@nebular/theme';

export const MENU_ITEMS: Map<string, NbMenuItem> = new Map([
  ['Dashboard', {
    title: 'Dashboard',
    icon: 'home-outline',
    link: '/canteen/dashboard',
    home: true,
  }],
  ['Configure', {
    title: 'Configure',
    icon: 'grid-outline',
    link: '/canteen/configuration',
  }],
  ['Notification', {
    title: 'Notification',
    icon: 'bell-outline',
    link: '/canteen/notification',
  }]
]);

import {Component, OnInit} from '@angular/core';
import {NbMenuItem} from '@nebular/theme';
import {MENU_ITEMS} from './canteen-menu';
import {AuthorityUtil} from '../@core/utils/AuthorityUtil';
import {LocalStorageUtil} from '../@core/utils/local-storage-util';

@Component({
  selector: 'app-canteen',
  template: `
    <app-one-column-layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </app-one-column-layout>
  `,
  styleUrls: ['./canteen.component.scss']
})
export class CanteenComponent implements OnInit {

  menu: NbMenuItem[] = [];

  constructor() {
  }

  ngOnInit() {
    this.menu = [];
    this.pushMenu();
  }

  pushMenu() {
    this.menu.push(MENU_ITEMS.get('Dashboard'));
    if (AuthorityUtil.checkAdmin()) {
      this.menu.push(MENU_ITEMS.get('Configure'));
    }
    if (AuthorityUtil.checkStudent()) {
      MENU_ITEMS.get('Transaction').link = '/canteen/transaction/' + LocalStorageUtil.getStorage().userId;
      this.menu.push(MENU_ITEMS.get('Transaction'));
    }
    this.menu.push(MENU_ITEMS.get('Notification'));
  }

}

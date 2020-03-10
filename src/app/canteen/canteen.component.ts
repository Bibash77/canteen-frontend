import {Component, OnInit} from '@angular/core';
import {NbMenuItem} from '@nebular/theme';
import {MENU_ITEMS} from './canteen-menu';
import {AuthorityUtil} from '../@core/utils/AuthorityUtil';

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
    if (AuthorityUtil.checkAdmin()) {
      this.menu.push(MENU_ITEMS.get('Configure'));
    }
    if (AuthorityUtil.checkStudent()) {
      this.menu.push(MENU_ITEMS.get('Dashboard'));
    }
    this.menu.push(MENU_ITEMS.get('Notification'));
  }

}

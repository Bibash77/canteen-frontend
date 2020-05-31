import {Component, OnInit} from '@angular/core';
import {NbMenuItem} from '@nebular/theme';
import {MENU_ITEMS} from './canteen-menu';
import {AuthorityUtil} from '../@core/utils/AuthorityUtil';
import {NotificationService} from './component/dashboard/notification/notifier/notification.service';

@Component({
  selector: 'app-canteen',
  template: `
    <app-one-column-layout>
      <nb-menu [items]="menu"></nb-menu>
      <!--<nb-list *ngFor="let menu of menu">{{menu.title}}</nb-list>-->
      <router-outlet></router-outlet>
    </app-one-column-layout>
  `,
  styleUrls: ['./canteen.component.scss']
})
export class CanteenComponent implements OnInit {

  menu: NbMenuItem[] = [];
  notificationCount = 0;

  constructor(private notificationService: NotificationService) {
  }

  ngOnInit() {
    this.menu = [];
    this.menu.push(MENU_ITEMS.get('Dashboard'));
    if (AuthorityUtil.checkAdmin()) {
      this.menu.push(MENU_ITEMS.get('Configure'));
    }
    this.notificationService.notificationCount.subscribe(value => {
      this.notificationCount = value;
      MENU_ITEMS.get('Notification').title = 'Notification(' + this.notificationCount.toString() + ')';
    });
    this.menu.push(MENU_ITEMS.get('Notification'));
  }

}

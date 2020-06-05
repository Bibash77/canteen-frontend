import {Component, OnInit} from '@angular/core';
import {NbMenuItem} from '@nebular/theme';
import {MENU_ITEMS} from './canteen-menu';
import {AuthorityUtil} from '../@core/utils/AuthorityUtil';
import {NotificationService} from './component/dashboard/notification/notifier/notification.service';
import {LocalStorageUtil} from '../@core/utils/local-storage-util';
import {UserType} from '../@core/userType';

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
  notificationCount = 0;
  isKitchener = LocalStorageUtil.getStorage().roleType === UserType.KITCHENER.toString();

  constructor(private notificationService: NotificationService) {
  }

  ngOnInit() {
    this.menu = [];
    if (AuthorityUtil.isUserActive()){
     this.pushMenu();
   }
  }

  pushMenu(){
    this.menu.push(MENU_ITEMS.get('Dashboard'));
    if (AuthorityUtil.checkAdmin()) {
      this.menu.push(MENU_ITEMS.get('Configure'));
    }
    if (this.isKitchener) {
      this.notificationService.notificationCount.subscribe(value => {
        this.notificationCount = value;
        MENU_ITEMS.get('Notification').title = 'Notification(' + this.notificationCount.toString() + ')';
      });
    }
    this.menu.push(MENU_ITEMS.get('Notification'));
  }

}

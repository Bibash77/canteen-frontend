import {Component, OnInit} from '@angular/core';
import {SearchDto} from '../../modal/SearchDto';
import {LocalStorageUtil} from '../../../../@core/utils/local-storage-util';
import {NotificationService} from './notifier/notification.service';
import {Message} from './message';
import {NbToastrService} from '@nebular/theme';
import {Router} from '@angular/router';
import {OtherUtils} from '../../../../@core/utils/OtherUtils';
import {SocketService} from './socket.service';
import {Status} from '../../../../@core/Status';
import {UserType} from '../../../../@core/userType';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {

  constructor(
    private notificationService: NotificationService,
    private nbToastrService: NbToastrService,
    private router: Router,
    private socketService: SocketService
  ) {
  }
  searchDto: SearchDto = new SearchDto();
  userType = (LocalStorageUtil).getStorage().roleType;
  notificationCount;
  notifications: Array<Message> = new Array<Message>();

  static fetchNotifications(n: NotificationComponent): void {
    const notificationSearchObject = {
      toId: LocalStorageUtil.getStorage().userId,
      toRole: null,
      status: Status.ACTIVE
    };
    if (n.userType !== UserType.STUDENT) {
      notificationSearchObject.toId = null;
      notificationSearchObject.toRole = n.userType;
    }
    n.notificationService.getPaginationWithSearchObject(notificationSearchObject, 1, 150).subscribe((response: any) => {
      const mes: Array<Message> = response.detail.content;
      n.notificationCount = response.detail.totalElements;
      mes.forEach(value => {
        n.notifications.push(value);
       });
      console.log('notification fetching' , response.detail.content);
    }, error => {
      console.error(error);
    });
  }

  ngOnInit() {
    NotificationComponent.fetchNotifications(this);
    this.socketService.newMsgCount.subscribe((res) => {
      this.notificationCount += 1;
      this.notifications.push(res);
    });
  }

  dateHourFormatter(date) {
    const date1 = new Date(date);
    const hour = date1.getHours() < 12 ? ' AM' : ' PM';
    return date1.getHours() + ':' + date1.getMinutes() + hour;
  }

  closeMessage(message: Message, status) {
    if (!message.isSeen) {
      this.nbToastrService.info('Please read the notify first', 'Alert!!' , OtherUtils.getIconConfig('bell-off-outline'));
      return false;
    }
    message.status = status;
    this.saveMessage(message);
    this.notifications.splice(this.notifications.indexOf(message) , 1);
  }

  readMessage(message: Message) {
    console.log(message);
    message.isSeen = true;
    this.saveMessage(message);
    if (message.actionType.toString() === 'ORDER' && this.userType !== 'Student' ) {
    message.orderCode = message.message.match('\\:(.*?)\\.')[1];
    this.router.navigate(['/canteen/dashboard'], {
        queryParams: {
          orderCode: message.orderCode,
        }
      });
    }
  }

  saveMessage(message) {
    this.notificationService.save(message).subscribe((updateNotification: any) => {
    }, error => {
      console.error(error);
      this.nbToastrService.show('Error updating notification status', 'ERROR!!');
    });
  }
}

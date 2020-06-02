import {Component, OnInit} from '@angular/core';
import {SearchDto} from '../../modal/SearchDto';
import {LocalStorageUtil} from '../../../../@core/utils/local-storage-util';
import {AuthorityUtil} from '../../../../@core/utils/AuthorityUtil';
import {NotificationService} from './notifier/notification.service';
import {Message} from './message';
import {NbToastrService} from '@nebular/theme';
import {Router} from '@angular/router';
import {TransactionType} from "../../../../@core/TransactionType";

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {
  searchDto: SearchDto = new SearchDto();
  isStudent;
  notificationCount;
  notifications: Array<Message> = new Array<Message>();

  constructor(
    private notificationService: NotificationService,
    private nbToastrService: NbToastrService,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.isStudent = AuthorityUtil.checkStudent();
    this.searchDto.userId = LocalStorageUtil.getStorage().userId;
    this.searchDto.orderStatus = 'PENDING';
    this.notificationService.notificationMessage.subscribe(value => this.notifications = value);
    console.log(this.notifications);
  }


  loadNext() {
/*    if (this.loading) { return }

    this.loading = true;
    this.placeholders = new Array(this.pageSize);
    this.newsService.load(this.pageToLoadNext, this.pageSize)
    .subscribe(news => {
      this.placeholders = [];
      this.news.push(...news);
      this.loading = false;
      this.pageToLoadNext++;
    });*/
  }

  dateHourFormatter(date) {
    const date1 = new Date(date);
    const hour = date1.getHours() < 12 ? ' AM' : ' PM';
    return date1.getHours() + ':' + date1.getMinutes() + hour;
  }

  closeMessage(message: Message, status) {
      message.status = status;
      this.saveMessage(message);
  }

  readMessage(message: Message) {
    message.isSeen = true;
    message.orderCode = message.message.match('\\:(.*?)\\.')[1];
    console.log(message.orderCode);
    this.saveMessage(message);
    if(message.transactionType === TransactionType.ORDER) {
      this.router.navigate(['/canteen/dashboard'], {
        queryParams: {
          orderCode: message.orderCode,
        }
      });
    }
  }

  saveMessage(message) {
    this.notificationService.save(message).subscribe((updateNotification: any) => {
      this.notificationService.fetchNotifications();
    }, error => {
      console.error(error);
      this.nbToastrService.show('Error updating notification status', 'ERROR!!');
    });
  }
}

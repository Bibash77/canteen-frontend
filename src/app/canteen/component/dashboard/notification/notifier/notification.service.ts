import { Injectable } from '@angular/core';
import {BaseService} from '../../../../../@core/BaseService';
import {Message} from '../message';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject} from 'rxjs';
import {LocalStorageUtil} from '../../../../../@core/utils/local-storage-util';
import {Status} from '../../../../../@core/Status';
import {UserType} from '../../../../../@core/userType';

@Injectable({
  providedIn: 'root'
})
export class NotificationService extends BaseService<Message> {
  static API = 'v1/notification';
  userType = (LocalStorageUtil).getStorage().roleType;

  constructor(protected  http: HttpClient) {
    super(http);
  }
  private notificationCountSource = new BehaviorSubject<any>(0);
  notificationCount = this.notificationCountSource.asObservable();

  private notificationMessageSource = new BehaviorSubject<any>(null);
  notificationMessage = this.notificationMessageSource.asObservable();

  setNotificationCount(count: any) {
    this.notificationCountSource.next(count);
    console.log(this.notificationCount);
  }

  setNotificationMessage(message: Array<Message>) {
    this.notificationMessageSource.next(message);
  }

  fetchNotifications(): void {
    const notificationSearchObject = {
      fromId: LocalStorageUtil.getStorage().userId,
      toRole: null,
      status: Status.ACTIVE
    };
    if (this.userType !== UserType.STUDENT) {
      notificationSearchObject.fromId = null;
      notificationSearchObject.toRole = this.userType;
    }
    this.getPaginationWithSearchObject(notificationSearchObject, 1, 15).subscribe((response: any) => {
      const mes: Array<Message> = response.detail.content;
      console.log(mes);
      console.log(response.detail.totalElements);
      this.setNotificationCount(response.detail.totalElements);
      this.setNotificationMessage(mes);
    }, error => {
      console.error(error);
    });
  }

  protected getApi(): string {
    return NotificationService.API;
  }
}

import { Injectable } from '@angular/core';
import {BaseService} from '../../../../../@core/BaseService';
import {Message} from '../message';
import {HttpClient} from '@angular/common/http';
import {LocalStorageUtil} from '../../../../../@core/utils/local-storage-util';

@Injectable({
  providedIn: 'root'
})
export class NotificationService extends BaseService<Message> {
  static API = 'v1/notification';
  userType = (LocalStorageUtil).getStorage().roleType;

  constructor(protected  http: HttpClient) {
    super(http);
  }
  protected getApi(): string {
    return NotificationService.API;
  }
}

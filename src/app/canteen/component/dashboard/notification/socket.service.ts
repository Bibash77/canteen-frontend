import { Injectable } from '@angular/core';
import {ApiConfig} from '../../../../@core/utils/ApiConfig';
import * as SockJS from 'sockjs-client';
import * as Stomp from 'stompjs';
import {LocalStorageUtil} from '../../../../@core/utils/local-storage-util';
import {Message} from './message';
import {NbToastrService} from '@nebular/theme';
import {NotificationService} from './notifier/notification.service';
import {AudioUtils} from "../../../../@core/utils/AudioUtils";

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  isCustomSocketOpened = false;
  message: Message = new Message();
  private stompClient;
  private serverUrl = `${ApiConfig.URL}/socket`;
  userId = Number(LocalStorageUtil.getStorage().userId);
  userRole = LocalStorageUtil.getStorage().roleType;

  constructor(private nbToastrService: NbToastrService,
              private notificationService: NotificationService ,
  ) { }


  // Web socket configurations initialization
  initializeWebSocketConnection() {
    const ws = new SockJS(this.serverUrl);
    this.stompClient = Stomp.over(ws);
    const that = this;
    this.stompClient.connect({}, function(frame) {
      that.openSocket();
    });
    console.log(this.stompClient);
    this.stompClient.debug = null;
  }

  openSocket() {
    this.isCustomSocketOpened = true;
    const data: Array<any> = [];

    console.log(LocalStorageUtil.getStorage());
    console.log(this.userRole, 'role');
    this.stompClient.subscribe(`/socket-publisher/${this.userRole}`, (response) => {
      const responseData = JSON.parse(response.body);
      this.nbToastrService.success(responseData.message , 'Success');
      AudioUtils.playSound();
      data.push(responseData.message);
      console.log(responseData.message , responseData);
      this.notificationService.fetchNotifications();
    });
  }

  sendMessageUsingSocket() {
    console.log('jjjj' , this.isCustomSocketOpened);
    console.log(this.userRole);
    this.stompClient.send('/socket-subscriber/send/message', {}, JSON.stringify(this.message));
  }
}

import { Injectable } from '@angular/core';
import {ApiConfig} from '../../../../@core/utils/ApiConfig';
import * as SockJS from 'sockjs-client';
import * as Stomp from 'stompjs';
import {LocalStorageUtil} from '../../../../@core/utils/local-storage-util';
import {Message} from './message';
import {NbToastrService} from '@nebular/theme';

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

  constructor(private nbToastrService: NbToastrService) { }


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

    console.log(this.userRole);
    this.stompClient.subscribe(`/socket-publisher/${this.userRole}`, (message) => {
      this.nbToastrService.success('New notification received!!!');
      console.log(message);
    });
  }

  sendMessageUsingSocket() {
    console.log('jjjj' , this.isCustomSocketOpened);
    this.stompClient.send('/socket-subscriber/send/message', {}, JSON.stringify(this.message));
  }
}

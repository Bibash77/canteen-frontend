import {EventEmitter, Injectable} from '@angular/core';
import {ApiConfig} from '../../../../@core/utils/ApiConfig';
import * as SockJS from 'sockjs-client';
import * as Stomp from 'stompjs';
import {LocalStorageUtil} from '../../../../@core/utils/local-storage-util';
import {Message} from './message';
import {NbToastrService} from '@nebular/theme';
import {NotificationService} from './notifier/notification.service';
import {AudioUtils} from '../../../../@core/utils/AudioUtils';
import {OtherUtils} from '../../../../@core/utils/OtherUtils';
import {NotificationComponent} from './notification.component';
import {root} from 'rxjs/internal-compatibility';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  newMsgCount: EventEmitter<Message> = new EventEmitter<Message>();

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
    // tslint:disable-next-line:only-arrow-functions
    this.stompClient.connect({}, function(frame) {
      that.openSocketByRole();
     /* that.openSocketById();*/
    });
    this.stompClient.debug = null;
  }

  openSocketByRole() {
    console.log(this.userRole);
    this.isCustomSocketOpened = true;
    this.stompClient.subscribe(`/socket-publisher/${this.userRole}`, (response) => {
      this.handleResponseData(response);
      console.log(response);
    });
  }

  openSocketById() {
    this.stompClient.subscribe(`/socket-publisher/${this.userId}`, (response) => {
      this.handleResponseData(response);
    });
  }

  handleResponseData(response) {
    const data: Array<any> = [];
    const responseData = JSON.parse(response.body);
    this.nbToastrService.success(responseData.message , 'Success' , OtherUtils.getIconConfig('bell-outline'));
    AudioUtils.playSound();
    console.log('collecting data' , response , responseData);
    this.newMsgCount.emit(responseData);
  }

  sendMessageUsingSocket() {
    console.log(this.isCustomSocketOpened);
    this.stompClient.send('/socket-subscriber/send/message', {}, JSON.stringify(this.message));
  }
}

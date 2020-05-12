import {Component, OnInit} from '@angular/core';
import {NbDialogService, NbToastrService} from '@nebular/theme';
import {RegisterComponent} from '../register/register.component';
import {UserService} from '../user.service';
import {Router} from '@angular/router';
import {LocalStorageUtil} from '../../../../@core/utils/local-storage-util';
import {ObjectUtil} from '../../../../@core/utils/ObjectUtil';
import {SocketService} from  '../../dashboard/notification/socket.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  spinner = false;
  duration = 0;

  constructor(private dialogService: NbDialogService,
              private userService: UserService,
              private router: Router,
              private toasterService: NbToastrService,
              private socketService: SocketService) {
  }

  ngOnInit() {
  }

  onRegister() {
    this.dialogService.open(RegisterComponent);
  }

  onSubmit(loginForm) {
    this.spinner = true;
    const datas = {
      userName: loginForm.userName,
      password: loginForm.password
    };
    this.userService.login(datas).subscribe((data: any) => {
       if (!ObjectUtil.isEmpty(data.detail.id)) {
         const storage = LocalStorageUtil.getStorage();
         storage.roleType = data.detail.roleType;
         storage.username = data.detail.userName;
         storage.userId = (data.detail.id).toString();
         storage.currentBalance = data.detail.walletAmount;
         storage.userCode = data.detail.userCode;
         storage.status = (data.detail.status);
         storage.fullName = data.detail.fullName;
         LocalStorageUtil.setStorage(storage);
         console.log(storage);
         this.spinner = false;
         this.router.navigateByUrl('/canteen/dashboard');
       } else {
         this.spinner = false;
         this.toasterService.danger('Invalid user name or password' , 'Error', {duration: this.duration} );
       }
      },
      error => {
        console.error(error);
      }
    );
  }
}

import { Component, OnInit } from '@angular/core';
import { NbDialogService} from '@nebular/theme';
import {RegisterComponent} from '../register/register.component';
import {UserService} from '../user.service';
import {Router} from '@angular/router';
import {LocalStorageUtil} from '../../../../@core/utils/local-storage-util';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
spinner = false;

  constructor(private dialogService: NbDialogService,
              private userService: UserService,
              private router: Router) { }

  ngOnInit() {
  }

onRegister() {
    this.dialogService.open(RegisterComponent);
}
onSubmit(loginForm) {
  const datas = {
    userName: loginForm.userName,
    password: loginForm.password
  };
  this.userService.login(datas).subscribe((data: any) => {
  const storage = LocalStorageUtil.getStorage();
  storage.roleType = data.detail.roleType;
  storage.username = data.detail.userName;
  storage.userId = (data.detail.id).toString();
  storage.currentBalance = data.detail.walletAmount;
  storage.status = (data.detail.status);
  LocalStorageUtil.setStorage(storage);
  console.log(storage);
  this.router.navigateByUrl('/canteen/dashboard');
});
}
}

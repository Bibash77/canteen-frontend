import { Component, OnInit } from '@angular/core';
import {TopUpComponent} from '../top-up/top-up.component';
import {NbDialogService} from '@nebular/theme';
import {UserService} from '../../../auth/user.service';
import {User} from '../../../modal/user';
import {WallletService} from '../top-up/walllet-service.service';
import {Wallet} from '../../../modal/wallet';
import {Router} from '@angular/router';

@Component({
  selector: 'app-user-config',
  templateUrl: './user-config.component.html',
  styleUrls: ['./user-config.component.scss']
})
export class UserConfigComponent implements OnInit {

  constructor(private dialogService: NbDialogService,
              private userService: UserService,
              private walletService: WallletService) { }

              walletList: Array<Wallet> = new Array<Wallet>();
              userList: Array<User> = new Array<User>();
  ngOnInit() {
    this.getAllUser();
  }


  topUp(user) {
    this.dialogService.open(TopUpComponent, {closeOnBackdropClick: true , closeOnEsc: true, context: {user}});
  }

  getAllUser() {
    this.walletService.getAll().subscribe(value => {
      this.walletList = value.detail;
      console.log('Sasa', this.walletList);
    });
  }

  changeUserStatus(user) {
    console.log(user);
    this.userService.changeStatus(user).subscribe(value => {
      alert(value.detail.username + ' is' + value.detail.status + 'now');
    });
  }
}

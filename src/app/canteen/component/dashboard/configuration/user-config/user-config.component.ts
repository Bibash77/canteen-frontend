import {Component, OnInit, TemplateRef} from '@angular/core';
import {TopUpComponent} from '../top-up/top-up.component';
import {NbDialogService} from '@nebular/theme';
import {UserService} from '../../../auth/user.service';
import {User} from '../../../modal/user';
import {Wallet} from '../../../modal/wallet';
import {WalletService} from '../top-up/wallet.service';
import {UserType} from "../../../../../@core/userType";

@Component({
  selector: 'app-user-config',
  templateUrl: './user-config.component.html'
})
export class UserConfigComponent implements OnInit {

  constructor(private dialogService: NbDialogService,
              private userService: UserService,
              private walletService: WalletService) { }

              walletList: Array<Wallet> = new Array<Wallet>();
              userList: Array<User> = new Array<User>();
              userType = UserType.values();
              toogle;
  ngOnInit() {
    this.getAllUser();
  }


  topUp(user) {
    this.dialogService.open(TopUpComponent, {closeOnBackdropClick: true , closeOnEsc: true, context: {user}});
  }

  getAllUser() {
    this.walletService.getAll().subscribe(value => {
      this.walletList = value.detail;
    });
  }

  changeUserStatus(user1, status , userType) {
    const user = new User();
    user.status = status;
    user.roleType = userType;
    user.id = user1.id;
    this.userService.changeStatus(user).subscribe(value => {
      console.log(user);
      alert(value.detail.username + ' is' + value.detail.status + 'now');
      this.ngOnInit();
    });
  }

  openConfig(dialog: TemplateRef<any>, user) {
    console.log(this.userType);
    console.log(user);
    this.dialogService.open(dialog, { context: user });
    return false;
  }
  toggleButton(status) {
    console.log(status);
    return status == 'ACTIVE';
  }
}

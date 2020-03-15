import {Component, OnInit, TemplateRef} from '@angular/core';
import {TopUpComponent} from '../top-up/top-up.component';
import {NbDialogService} from '@nebular/theme';
import {UserService} from '../../../auth/user.service';
import {User} from '../../../modal/user';
import {Wallet} from '../../../modal/wallet';
import {WalletService} from '../top-up/wallet.service';
import {UserType} from '../../../../../@core/userType';
import {SearchDto} from '../../../modal/SearchDto';
import {PaginationUtils} from '../../../../../@core/utils/PaginationUtils';
import {Pageable} from '../../../modal/common-pageable';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-user-config',
  templateUrl: './user-config.component.html'
})
export class UserConfigComponent implements OnInit {

  constructor(private dialogService: NbDialogService,
              private userService: UserService,
              private walletService: WalletService,
              private formBuilder: FormBuilder) { }

              walletList: Array<Wallet> = new Array<Wallet>();
              userList: Array<User> = new Array<User>();
              userType = UserType.values();
  isFilterCollapsed = true;

  searchForm: FormGroup;
  page = 1;
  search: SearchDto = new SearchDto();
  spinner = false;
  pageable: Pageable = new Pageable();
              toogle;

  static loadData(other: UserConfigComponent) {
    other.spinner = true;
    other.walletService.getPaginationWithSearchObject(other.search , other.page, 10).subscribe((response: any) => {
      other.walletList = response.detail.content;
      other.pageable = PaginationUtils.getPageable(response.detail);
      other.spinner = false;
    }, error => {
      console.error(error);
    });
  }
  ngOnInit() {
    this.buildForm();
    this.search.userStatus = 'INACTIVE';
    UserConfigComponent.loadData(this);
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

  changePage(page: number) {
    this.page = page;
    UserConfigComponent.loadData(this);
  }
  searchData() {
    console.log(this.searchForm.value);
    if (this.searchForm.get('userCode').value === '') {
      this.searchForm.get('userCode').setValue(null);
    }
    this.search = this.searchForm.value;
    UserConfigComponent.loadData(this);
  }
  buildForm() {
    this.searchForm = this.formBuilder.group({
      userStatus: ['INACTIVE'],
      userCode: [undefined],
      userName: [undefined]
    });
  }
}

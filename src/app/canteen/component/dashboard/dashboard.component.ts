import {Component, OnInit} from '@angular/core';
import {AuthorityUtil} from '../../../@core/utils/AuthorityUtil';
import {LocalStorageUtil} from '../../../@core/utils/local-storage-util';
import {FormBuilder, FormGroup} from '@angular/forms';
import {SearchDto} from '../modal/SearchDto';
import {Pageable} from '../modal/common-pageable';
import {OrderService} from './item-list/order.service';
import {WalletService} from './configuration/top-up/wallet.service';
import {UserService} from '../auth/user.service';
import {ObjectUtil} from '../../../@core/utils/ObjectUtil';
import {ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  isAdmin: boolean;
  isKitchener: boolean;
  form: FormGroup;
  countOrderData = {
  topUpAmount: 0,
  expenditureCount: 0,
  quantityCount: 0,
  userCount: 0
  };
  isStudent: boolean;
  user;
  searchForm: SearchDto = new SearchDto();
  page = 1;
  spinner = false;
  pageable: Pageable = new Pageable();
  isFilterCollapsed = true;
  orderCode: string;

  constructor(private formBuilder: FormBuilder,
              private orderService: OrderService,
              private walletService: WalletService,
              private userService: UserService,
              private activatedRoute: ActivatedRoute, ) {
  }

  ngOnInit() {
    this.buildForm();
    this.user = LocalStorageUtil.getStorage();
    this.checkAuthority();
    if (this.isAdmin) {
      this.setDate();
    }
    if (this.isKitchener) {
      this.getNotifyRouteData();
    }
  }

  checkAuthority() {
    this.isAdmin = AuthorityUtil.checkAdmin();
    this.isKitchener = AuthorityUtil.checkKitchener();
    this.isStudent = AuthorityUtil.checkStudent();
  }

  setDate() {
    const startDate = new Date();
    const endDate = new Date();
    startDate.setDate(startDate.getDate());
    endDate.setDate(endDate.getDate() + 1);
    this.searchForm.date = JSON.stringify({
      startDate: new Date(startDate).toLocaleDateString(),
      endDate: new Date(endDate).toLocaleDateString()
    });
    this.getCountOrdersByDate(startDate.toLocaleDateString(), endDate.toLocaleDateString());
  }

  getCountOrdersByDate(startDate, endDate) {
    this.orderService.countOrders(startDate, endDate).subscribe(value => {
      if (!ObjectUtil.isEmpty(value.detail.expenditureCount)) {
        this.countOrderData.expenditureCount = value.detail.expenditureCount;
      }
    });
    this.walletService.countTopUp(startDate, endDate).subscribe(value => {
      this.countOrderData.topUpAmount = value.detail.topUpAmount;
      if (value.detail.topUpAmount === undefined ) {
        this.countOrderData.topUpAmount = 0;
      }
    });
    this.userService.countUser(startDate, endDate).subscribe(value => {
      this.countOrderData.userCount = value.detail.user;
      if (value.detail.topUpAmount == null ) {
        this.countOrderData.userCount = 0;
      }
    });
    console.log(this.countOrderData);
  }

  searchOrdersByDate() {
    this.searchForm.date = this.form.value;
    this.getCountOrdersByDate(new Date(this.form.get('startDate').value).toLocaleDateString(),
      new Date(this.form.get('endDate').value).toLocaleDateString());
  }

  buildForm() {
    this.form = this.formBuilder.group({
      startDate: [undefined],
      endDate: [undefined]
    });
  }

  getNotifyRouteData() {
    this.activatedRoute.queryParams.subscribe(
      (paramsValue: Params) => {
        this.orderCode = paramsValue.orderCode;
      });
  }
}

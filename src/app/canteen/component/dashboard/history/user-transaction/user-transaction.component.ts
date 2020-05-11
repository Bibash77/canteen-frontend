import {Component, Input, OnInit, TemplateRef} from '@angular/core';
import {WalletService} from '../../configuration/top-up/wallet.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {Pageable} from '../../../modal/common-pageable';
import {OrderService} from '../../item-list/order.service';
import {SearchDto} from '../../../modal/SearchDto';
import {OrderDto} from '../../../modal/orderDto';
import {FormBuilder, FormGroup} from '@angular/forms';
import {TopUpHistoryService} from './top-up-history.service';
import {PaginationUtils} from '../../../../../@core/utils/PaginationUtils';
import {AuthorityUtil} from '../../../../../@core/utils/AuthorityUtil';
import {NbDialogService} from '@nebular/theme';
import {TopUpProfileComponent} from "./top-up-profile/top-up-profile.component";

@Component({
  selector: 'app-user-transaction',
  templateUrl: './user-transaction.component.html',
  styleUrls: ['./user-transaction.component.scss']
})
export class UserTransactionComponent implements OnInit {
  constructor(private walletService: WalletService,
              private router: Router,
              private route: ActivatedRoute,
              private orderService: OrderService,
              private formBuilder: FormBuilder,
              protected topUpHistoryService: TopUpHistoryService,
              private nbDialogService: NbDialogService) { }

  searchForm: FormGroup;

  @Input() status;
  transaction = [];
  page = 1;
  order: Array<OrderDto> = [];
  topUpHistoryData = [];
  searchDto: SearchDto = new SearchDto();
  topUpSearch: SearchDto = new SearchDto();
  spinner = false;
  searchObject;
  isFilterCollapsed = true;
  id;
  pageable: Pageable = new Pageable();

  static loadData(other: UserTransactionComponent) {
    other.spinner = true;
    other.topUpHistoryService.topUpHistory(other.topUpSearch, other.page, 10).subscribe((response: any) => {
      console.log(response.detail.content);
      other.topUpHistoryData = response.detail.content;
      other.pageable = PaginationUtils.getPageable(response.detail);
      other.spinner = false;
    }, error => {
      console.error(error);
    });
  }

  ngOnInit() {
    this.buildForm();
    // this.route.snapshot.params.id;
    this.id =  this.route.snapshot.paramMap.get('id');
    console.log(this.id);
    this.searchDto.userId = this.id;
    this.topUpSearch.userId = this.id;
    this.searchDto.orderStatus = 'DELIVERED';
    UserTransactionComponent.loadData(this);
  }

  color(value) {
    return value.indexOf('-') !== -1;
  }

  searchOrdersByDate() {
    this.topUpSearch.date = JSON.stringify({
      startDate: new Date(this.searchForm.get('startingDate').value).toLocaleDateString(),
      endDate: new Date(this.searchForm.get('endingDate').value).toLocaleDateString()
    });
    UserTransactionComponent.loadData(this);
  }

  buildForm() {
    this.searchForm = this.formBuilder.group({
      startingDate: [undefined],
      endingDate: [undefined]
    });
  }

  changePage(page: number) {
    this.page = page;
    UserTransactionComponent.loadData(this);
  }

  openHistoryDetail(topUpDetails) {
    this.nbDialogService.open(TopUpProfileComponent, {closeOnBackdropClick: true , closeOnEsc: true, context: {topUpDetails}});
  }
}

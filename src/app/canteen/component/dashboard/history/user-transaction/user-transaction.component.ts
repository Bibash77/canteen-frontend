import {Component, Input, OnInit} from '@angular/core';
import {WalletService} from '../../configuration/top-up/wallet.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {Pageable} from '../../../modal/common-pageable';
import {OrderService} from '../../item-list/order.service';
import {SearchDto} from '../../../modal/SearchDto';
import {OrderDto} from '../../../modal/orderDto';
import {FormBuilder, FormGroup} from '@angular/forms';
import {TopUpHistoryService} from './top-up-history.service';
import {PaginationUtils} from "../../../../../@core/utils/PaginationUtils";

@Component({
  selector: 'app-user-transaction',
  templateUrl: './user-transaction.component.html',
  styleUrls: ['./user-transaction.component.scss']
})
export class UserTransactionComponent implements OnInit {

  searchForm: FormGroup;

  @Input() status;
  transaction = [];
  order: Array<OrderDto> = [];
  topUpHistoryData = [];
  searchDto: SearchDto = new SearchDto();
  topUpSearch: SearchDto = new SearchDto();
  spinner = false;
  searchObject;
  isFilterCollapsed = true;
  id;
  pageable: Pageable = new Pageable();
  constructor(private walletService: WalletService,
              private router: Router,
              private route: ActivatedRoute,
              private orderService: OrderService,
              private formBuilder: FormBuilder,
              protected topUpHistoryService: TopUpHistoryService) { }

  ngOnInit() {
    this.buildForm();
    // this.route.snapshot.params.id;
    this.id =  this.route.snapshot.paramMap.get('id');
    console.log(this.id);
    this.searchDto.userId = this.id;
    this.topUpSearch.userId = this.id;
    this.searchDto.orderStatus = 'DELIVERED';
    this.topUpHistory(this.topUpSearch);
  }

  color(value) {
    return value.indexOf('-') !== -1;
  }

  searchOrdersByDate() {
    this.searchDto.date = JSON.stringify({
      startDate: new Date(this.searchForm.get('startingDate').value).toLocaleDateString(),
      endDate: new Date(this.searchForm.get('endingDate').value).toLocaleDateString()
    });
    this.topUpHistory(this.searchForm.value);
  }

  buildForm() {
    this.searchForm = this.formBuilder.group({
      startingDate: [undefined],
      endingDate: [undefined]
    });
  }

  topUpHistory(searchObject) {
this.topUpHistoryService.topUpHistory(searchObject , 1 , 10).subscribe(response => {
  console.log(response);
  this.topUpHistoryData = response.detail.content;
  this.pageable = PaginationUtils.getPageable(response.detail);
  this.spinner = false;
});
  }
}

import {
  AfterViewChecked,
  AfterViewInit,
  Component, ElementRef,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges, ViewChild
} from '@angular/core';
import {WalletService} from '../../configuration/top-up/wallet.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Pageable} from '../../../modal/common-pageable';
import {OrderService} from '../../item-list/order.service';
import {SearchDto} from '../../../modal/SearchDto';
import {OrderDto} from '../../../modal/orderDto';
import {FormBuilder, FormGroup} from '@angular/forms';
import {TopUpHistoryService} from './top-up-history.service';
import {NbDialogService, NbToastrService} from '@nebular/theme';
import {TopUpProfileComponent} from './top-up-profile/top-up-profile.component';
import {OtherUtils} from '../../../../../@core/utils/OtherUtils';

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
              private nbDialogService: NbDialogService,
              private nbToastrService: NbToastrService) { }

  searchForm: FormGroup;

  @Input() status;
  transaction = [];
  order: Array<OrderDto> = [];
  topUpHistoryData = [];
  searchDto: SearchDto = new SearchDto();
  topUpSearch: SearchDto = new SearchDto();
  spinner = false;
  isFilterCollapsed = true;
  id;
  page = 1;
  size = 10;
  totalPages = 0;
  pageNo = 1;

  ngOnInit() {
    this.buildForm();
    // this.route.snapshot.params.id;
    this.id =  this.route.snapshot.paramMap.get('id');
    this.searchDto.userId = this.id;
    this.topUpSearch.userId = this.id;
    /*this.searchDto.orderStatus = 'DELIVERED';*/
    this.loadData();
  }

  color(value) {
    return value.indexOf('-') !== -1;
  }

  searchOrdersByDate() {
    this.topUpSearch.date = JSON.stringify({
      startDate: new Date(this.searchForm.get('startingDate').value).toLocaleDateString(),
      endDate: new Date(this.searchForm.get('endingDate').value).toLocaleDateString()
    });
    this.loadData();
  }

  buildForm() {
    this.searchForm = this.formBuilder.group({
      startingDate: [undefined],
      endingDate: [undefined]
    });
  }

  openHistoryDetail(topUpDetails) {
    this.nbDialogService.open(TopUpProfileComponent, {closeOnBackdropClick: true , closeOnEsc: true, context: {topUpDetails}});
  }

   loadData() {
    this.spinner = true;
    this.topUpHistoryService.topUpHistory(this.topUpSearch, this.pageNo, this.size).subscribe((response: any) => {
      if (response.detail.content.length <= 0) {
        this.nbToastrService.info('You are All Caught Up' , 'No More Transaction' , OtherUtils.getIconConfig('backspace-outline'));
        return;
      }
      // tslint:disable-next-line:no-shadowed-variable
      response.detail.content.forEach( response => {
        this.topUpHistoryData.push(response);
      });
      console.log(this.topUpHistoryData);
      this.totalPages = response.detail.totalPages;
      this.pageNo = response.detail.pageable.pageNumber + 2;
      console.log(response.detail.pageable.pageNumber);
      this.spinner = false;
    }, error => {
      console.error(error);
    });
  }

  loadMore(): void {
      this.loadData();
  }
}

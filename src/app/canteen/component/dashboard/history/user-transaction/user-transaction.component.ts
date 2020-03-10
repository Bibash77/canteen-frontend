import {Component, Input, OnInit} from '@angular/core';
import {WalletService} from '../../configuration/top-up/wallet.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {Pageable} from '../../../modal/common-pageable';
import {OrderService} from '../../item-list/order.service';
import {SearchDto} from '../../../modal/SearchDto';
import {OrderDto} from '../../../modal/orderDto';

@Component({
  selector: 'app-user-transaction',
  templateUrl: './user-transaction.component.html',
  styleUrls: ['./user-transaction.component.scss']
})
export class UserTransactionComponent implements OnInit {


  @Input() status;
  transaction = [];
  order: Array<OrderDto> = [];
  searchDto: SearchDto = new SearchDto();
  searchObject;
  isFilterCollapsed = true;
  id;
  pageable: Pageable = new Pageable();
  constructor(private walletService: WalletService,
              private router: Router,
              private route: ActivatedRoute,
              private orderService: OrderService) { }

  ngOnInit() {
    // this.route.snapshot.params.id;
    this.id =  this.route.snapshot.paramMap.get('id');
    this.walletService.topUpHistory(this.id).subscribe(value => {
      this.transaction = value.detail;
    }) ;
    this.searchDto.userId = this.id;
    this.searchDto.orderStatus = 'DELIVERED';
  }

  color(value) {
    return value.indexOf('-') !== -1;
  }

}

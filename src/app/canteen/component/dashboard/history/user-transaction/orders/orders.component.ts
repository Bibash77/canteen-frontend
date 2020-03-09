import {Component, Input, OnInit} from '@angular/core';
import {OrderService} from '../../../item-list/order.service';
import {ObjectUtil} from '../../../../../../@core/utils/ObjectUtil';
import {SearchDto} from '../../../../modal/SearchDto';
import {Pageable} from '../../../../modal/common-pageable';
import {PaginationUtils} from '../../../../../../@core/utils/PaginationUtils';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  constructor(private orderService: OrderService) { }

  @Input() searchDto: SearchDto;
  order = [];
  page = 1;
  spinner = false;
  search: SearchDto = new SearchDto();
  pageable: Pageable = new Pageable();

  static loadData(other: OrdersComponent) {
    other.spinner = true;
    other.orderService.getOrderHistory(other.search , other.page, 10).subscribe((response: any) => {
      other.order = response.detail.content;
      other.pageable = PaginationUtils.getPageable(response.detail);
      other.spinner = false;
    }, error => {
      console.error(error);
    });
  }

  ngOnInit() {
    this.searchDto.createdAt = null;
    this.search = this.searchDto;
    OrdersComponent.loadData(this);
  }

  changePage(page: number) {
    this.page = page;
    OrdersComponent.loadData(this);
  }
}

import {Component, Input, OnInit} from '@angular/core';
import {OrderService} from '../../../item-list/order.service';
import {ObjectUtil} from '../../../../../../@core/utils/ObjectUtil';
import {SearchDto} from '../../../../modal/SearchDto';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  @Input() searchDto: SearchDto;
  constructor(private orderService: OrderService) { }
  order = [];

  ngOnInit() {
    this.searchDto.createdAt = null;
    this.orderService.getOrderHistory(this.searchDto).subscribe(value => {
      this.order = value.detail;
    });
  }

}

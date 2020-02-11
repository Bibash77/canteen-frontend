import { Component, OnInit } from '@angular/core';
import {OrderService} from "../item-list/order.service";
import {OrderDto} from "../../modal/orderDto";
import {SearchDto} from "../../modal/SearchDto";

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {
  order: Array<OrderDto> = [];
  searchDto: SearchDto = new SearchDto();
  news = [];
  placeholders = [];
  pageSize = 10;
  pageToLoadNext = 1;
  loading = false;
  constructor(
    private orderService: OrderService
  ) { }

  ngOnInit() {
    this.searchDto.orderStatus = 'PENDING';
    this.orderService.getOrderHistory(this.searchDto).subscribe(value => {
      this.order = value.detail;
    });
  }


  loadNext() {
/*    if (this.loading) { return }

    this.loading = true;
    this.placeholders = new Array(this.pageSize);
    this.newsService.load(this.pageToLoadNext, this.pageSize)
    .subscribe(news => {
      this.placeholders = [];
      this.news.push(...news);
      this.loading = false;
      this.pageToLoadNext++;
    });*/
  }
}

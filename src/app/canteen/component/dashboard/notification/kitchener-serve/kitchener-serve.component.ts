import {Component, OnInit, TemplateRef} from '@angular/core';
import {OrderDto} from '../../../modal/orderDto';
import {SearchDto} from '../../../modal/SearchDto';
import {OrderService} from '../../item-list/order.service';
import {NbDialogService} from "@nebular/theme";

@Component({
  selector: 'app-kitchener-serve',
  templateUrl: './kitchener-serve.component.html',
  styleUrls: ['./kitchener-serve.component.scss']
})
export class KitchenerServeComponent implements OnInit {

  order: Array<OrderDto> = [];
  searchDto: SearchDto = new SearchDto();
  options = [
    { value: 'PENDING', label: 'Revert To Pending', checked: true },
    { value: 'READY', label: 'Notify Ready' },
    { value: 'DELIVERED', label: 'Deliver Order' },
  ];
  news = [];
  placeholders = [];
  pageSize = 10;
  pageToLoadNext = 1;
  loading = false;
  constructor(
    private orderService: OrderService,
    private dialogService: NbDialogService
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

  openDialog(dialog: TemplateRef<any>, item) {
    this.dialogService.open(dialog, { context: item });
  }
}

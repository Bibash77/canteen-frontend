import {Component, OnInit, TemplateRef} from '@angular/core';
import {OrderDto} from '../../../modal/orderDto';
import {SearchDto} from '../../../modal/SearchDto';
import {OrderService} from '../../item-list/order.service';
import {NbDialogService} from '@nebular/theme';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-kitchener-serve',
  templateUrl: './kitchener-serve.component.html',
  styleUrls: ['./kitchener-serve.component.scss']
})
export class KitchenerServeComponent implements OnInit {

  order: Array<OrderDto> = [];
  searchForm: FormGroup;
  searchDto: SearchDto = new SearchDto();
  orderDto: OrderDto = new OrderDto();
  isFilterCollapsed = true;
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
    private dialogService: NbDialogService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.buildForm();
    this.orderDto.orderStatus = 'PENDING';
    this.orderService.getOrderHistory(this.orderDto).subscribe(value => {
      this.order = value.detail;
    });
  }

  buildForm() {
    this.searchForm = this.formBuilder.group({
      orderStatus: [undefined],
      orderCode: [undefined],
      itemName: [undefined]
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

  changeOrderStatus(order , action) {
    console.log(order);
    this.orderDto.id = order.id;
    this.orderDto.orderStatus = action;
    this.orderDto.orderCode = order.orderCode;
    this.orderService.deliverItem(this.orderDto).subscribe(value => {
  this.ngOnInit();
   });
  }

  search() {
   /* this.searchForm.valueChanges.subscribe(values => {
      this.orderService.getOrderHistory(this.searchForm.value).subscribe(value => {
        console.log(value);
        this.order = value.detail;
      });
    });*/
    console.log(this.searchForm.value);
    if(this.searchForm.get('orderCode').value === ''){
      this.searchForm.get('orderCode').setValue(null);
    }
    this.orderService.getOrderHistory(this.searchForm.value).subscribe(value => {
      console.log(value);
      this.order = value.detail;
    });
  }
}

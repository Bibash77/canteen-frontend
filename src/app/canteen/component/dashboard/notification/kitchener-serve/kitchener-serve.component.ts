import {Component, Input, OnInit, TemplateRef} from '@angular/core';
import {OrderDto} from '../../../modal/orderDto';
import {SearchDto} from '../../../modal/SearchDto';
import {OrderService} from '../../item-list/order.service';
import {NbDialogService, NbToastrService} from '@nebular/theme';
import {FormBuilder, FormGroup} from '@angular/forms';
import {PaginationUtils} from '../../../../../@core/utils/PaginationUtils';
import {Pageable} from '../../../modal/common-pageable';
import {ObjectUtil} from '../../../../../@core/utils/ObjectUtil';

@Component({
  selector: 'app-kitchener-serve',
  templateUrl: './kitchener-serve.component.html',
  styleUrls: ['./kitchener-serve.component.scss']
})
export class KitchenerServeComponent implements OnInit {
  @Input() orderCode;
  order: Array<OrderDto> = [];
  searchForm: FormGroup;
  page = 1;
  spinner = false;
  searchDto: SearchDto = new SearchDto();
  pageable: Pageable = new Pageable();
  orderDto: OrderDto = new OrderDto();
  isFilterCollapsed = true;
  options = [
    {value: 'PENDING', label: 'Revert To Pending'},
    {value: 'READY', label: 'Notify Ready'},
    {value: 'DELIVERED', label: 'Deliver Order'},
  ];
  placeholders = [];
  pageSize = 10;
  pageToLoadNext = 1;
  loading = false;

  constructor(
    private orderService: OrderService,
    private dialogService: NbDialogService,
    private formBuilder: FormBuilder, private toasterService: NbToastrService,
  ) {
  }

  static loadData(other: KitchenerServeComponent) {
    other.spinner = true;
    other.orderService.getOrderHistory(other.orderDto, other.page, 10).subscribe((response: any) => {
      other.order = response.detail.content;
      other.pageable = PaginationUtils.getPageable(response.detail);
      other.spinner = false;
    }, error => {
      console.error(error);
    });
  }

  ngOnInit() {
    this.orderDto = new OrderDto();
    this.buildForm();
    this.setInitialSearchParam();
    KitchenerServeComponent.loadData(this);
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
    this.dialogService.open(dialog, {context: item});
  }

  changeOrderStatus(order, action) {
    this.orderDto.id = order.id;
    this.orderDto.orderStatus = action;
    this.orderDto.orderCode = order.orderCode;
    this.orderService.deliverItem(this.orderDto).subscribe(value => {
      this.toasterService.info('successfully change to ' + action, 'Success');

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
    if (this.searchForm.get('orderCode').value === '') {
      this.searchForm.get('orderCode').setValue(null);
    }
    this.orderDto = this.searchForm.value;
    KitchenerServeComponent.loadData(this);
  }

  changePage(page: number) {
    this.page = page;
    KitchenerServeComponent.loadData(this);
  }

  setInitialSearchParam() {
    if (!ObjectUtil.isEmpty(this.orderCode)) {
      this.orderDto.orderCode = this.orderCode;
    } else {
      this.orderDto.orderStatus = 'PENDING';
    }
  }
}

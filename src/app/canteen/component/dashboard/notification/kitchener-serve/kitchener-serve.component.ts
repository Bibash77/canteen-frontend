import {Component, Input, OnInit, TemplateRef} from '@angular/core';
import {OrderDto} from '../../../modal/orderDto';
import {OrderService} from '../../item-list/order.service';
import {NbDialogService, NbToastrService} from '@nebular/theme';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ObjectUtil} from '../../../../../@core/utils/ObjectUtil';
import {OtherUtils} from '../../../../../@core/utils/OtherUtils';

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
  orderDto: OrderDto = new OrderDto();
  isFilterCollapsed = true;
  options = [
    {value: 'PENDING', label: 'Revert To Pending'},
    {value: 'READY', label: 'Notify Ready'},
    {value: 'DELIVERED', label: 'Deliver Order'},
  ];
  pageSize = 10;

  constructor(
    private orderService: OrderService,
    private dialogService: NbDialogService,
    private formBuilder: FormBuilder,
    private toasterService: NbToastrService,
  ) {
  }

  loadData() {
    this.spinner = true;
    this.orderService.getOrderHistory(this.orderDto, this.page, this.pageSize).subscribe((response: any) => {
      if (response.detail.content.length <= 0) {
        this.toasterService.info('You are All Caught Up', 'No More orders ', OtherUtils.getIconConfig('backspace-outline'));
        return;
      }
      // tslint:disable-next-line:no-shadowed-variable
      response.detail.content.forEach(response => {
        this.order.push(response);
      });
      this.page = response.detail.pageable.pageNumber + 2;
      this.spinner = false;
    }, error => {
      console.error(error);
    });
  }

  ngOnInit() {
    this.orderDto = new OrderDto();
    this.buildForm();
    this.setInitialSearchParam();
    this.loadData();
  }

  buildForm() {
    this.searchForm = this.formBuilder.group({
      orderStatus: [undefined],
      orderCode: [undefined],
      itemName: [undefined]
    });
  }

  openDialog(dialog: TemplateRef<any>, item) {
    this.dialogService.open(dialog, {context: item});
  }

  changeOrderStatus(order, action) {
    this.orderDto.id = order.id;
    this.orderDto.orderStatus = action;
    this.orderDto.orderCode = order.orderCode;
    this.orderService.deliverItem(this.orderDto).subscribe(value => {
      this.toasterService.info('successfully change to ' + action, 'Success', OtherUtils.getIconConfig('checkmark-circle-outline'));

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

    this.page = 1;
    this.order = [];
    if (this.searchForm.get('orderCode').value === '') {
      this.searchForm.get('orderCode').setValue(null);
    }
    this.orderDto = this.searchForm.value;
    this.loadData();
  }

  setInitialSearchParam() {
    if (!ObjectUtil.isEmpty(this.orderCode)) {
      this.orderDto.orderCode = this.orderCode;
    } else {
      this.orderDto.orderStatus = 'PENDING';
    }
  }
}

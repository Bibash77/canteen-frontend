import {Component, Input, OnInit} from '@angular/core';
import {OrderService} from '../../../item-list/order.service';
import {SearchDto} from '../../../../modal/SearchDto';
import {Pageable} from '../../../../modal/common-pageable';
import {PaginationUtils} from '../../../../../../@core/utils/PaginationUtils';
import {FormBuilder, FormGroup} from '@angular/forms';
import {AuthorityUtil} from '../../../../../../@core/utils/AuthorityUtil';
import {NbDialogService} from '@nebular/theme';
import {OrderProfileComponent} from '../order-profile/order-profile.component';
import {ObjectUtil} from '../../../../../../@core/utils/ObjectUtil';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  @Input() searchDto: SearchDto;
  order = [];
  isAdmin: boolean;
  iskitchener: boolean;
  searchForm: FormGroup;
  isFilterCollapsed = true;
  page = 1;
  spinner = false;
  search: SearchDto = new SearchDto();
  pageable: Pageable = new Pageable();

  constructor(private orderService: OrderService,
              private formBuilder: FormBuilder,
              private nbDialogService: NbDialogService) {
  }

  static loadData(other: OrdersComponent) {
    if (AuthorityUtil.checkAdmin()) {
      other.search.userId = undefined;
      other.isAdmin = true;
    }
    if (AuthorityUtil.checkKitchener()) {
      other.search.userId = undefined;
      other.iskitchener = true;
    }
    console.log(other.search);
    other.spinner = true;
    other.orderService.getOrderHistory(other.search, other.page, 10).subscribe((response: any) => {
      other.order = response.detail.content;
      other.pageable = PaginationUtils.getPageable(response.detail);
      other.spinner = false;
    }, error => {
      console.error(error);
    });
  }

  ngOnInit() {
    this.search = this.searchDto;
    OrdersComponent.loadData(this);
    this.buildForm();
  }

  changePage(page: number) {
    this.page = page;
    OrdersComponent.loadData(this);
  }

  buildForm() {
    this.searchForm = this.formBuilder.group({
      startDate: [undefined],
      endDate: [undefined],
      orderStatus: [undefined]
    });
  }
  searchOrdersByDate() {
    const startDate = this.searchForm.get('startDate').value;
    const endDate =   this.searchForm.get('endDate').value;
    if (!ObjectUtil.isEmpty(startDate) && !ObjectUtil.isEmpty(endDate)) {
     this.search.date = JSON.stringify({
       startDate: new Date(startDate).toLocaleDateString(),
       endDate: new Date(endDate).toLocaleDateString()
     });
   }
    this.search.orderStatus = this.searchForm.get('orderStatus').value;
    OrdersComponent.loadData(this);
  }

  openOrderProfile(order) {
    this.nbDialogService.open(OrderProfileComponent, {closeOnBackdropClick: true , closeOnEsc: true, context: {order}});
  }
}

import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {OrderService} from '../../../item-list/order.service';
import {SearchDto} from '../../../../modal/SearchDto';
import {Pageable} from '../../../../modal/common-pageable';
import {FormBuilder, FormGroup} from '@angular/forms';
import {NbDialogService} from '@nebular/theme';
import {OrderProfileComponent} from '../order-profile/order-profile.component';
import {ObjectUtil} from '../../../../../../@core/utils/ObjectUtil';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit , OnChanges{
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
  size = 10;
  totalPages = 0;
  pageNo = 1;

  constructor(private orderService: OrderService,
              private formBuilder: FormBuilder,
              private nbDialogService: NbDialogService) {
  }

  ngOnInit() {
    this.search = this.searchDto;
    this.loadData(this.size);
    this.buildForm();
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
    this.loadData(this.size);
  }

  openOrderProfile(order) {
    this.nbDialogService.open(OrderProfileComponent, {closeOnBackdropClick: true , closeOnEsc: true, context: {order}});
  }

  scrollToBottom(): void {
    this.loadData(this.size);
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.loadData(this.size);
  }

  loadData(size) {
   /* if (AuthorityUtil.checkAdmin()) {
      this.search.userId = undefined;
      this.isAdmin = true;
    }
    if (AuthorityUtil.checkKitchener()) {
      this.search.userId = undefined;
      this.iskitchener = true;
    }*/
    this.spinner = true;
    this.orderService.getOrderHistory(this.search, this.pageNo, size).subscribe((response: any) => {
      response.detail.content.forEach(response => {
        this.order.push(response);
      });
      console.log(this.search);
      this.totalPages = response.detail.totalPages;
      this.pageNo = response.detail.pageable.pageNumber + 2;
      console.log(response.detail.pageable.pageNumber);
      this.spinner = false;
    }, error => {
      console.error(error);
    });
  }
}

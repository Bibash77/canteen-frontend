import {Component, OnInit, TemplateRef} from '@angular/core';
import {Item} from '../../modal/Item';
import {ItemService} from '../configuration/add-item/item.service';
import {AddItemComponent} from '../configuration/add-item/add-item.component';
import {NbDialogService, NbToastrService} from '@nebular/theme';
import {AuthorityUtil} from '../../../../@core/utils/AuthorityUtil';
import {OrderService} from './order.service';
import {OrderDto} from '../../modal/orderDto';
import {LocalStorageUtil} from '../../../../@core/utils/local-storage-util';
import {Router} from '@angular/router';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html'
})
export class ItemListComponent implements OnInit {

  constructor( private itemService: ItemService,
               private dialogService: NbDialogService,
               private orderService: OrderService,
               private toastrService: NbToastrService,
               private router: Router) { }

  item: Array<Item> = new Array<Item>();
  orderDto: OrderDto = new OrderDto();
  totalExpenses;
  isAdmin;
  isStudent;

  static loadData(configure: ItemListComponent) {
    configure.itemService.getAll().subscribe(value => {
      configure.item = value.detail;
    });
  }

  ngOnInit() {
    ItemListComponent.loadData(this);
    this.isAdmin = AuthorityUtil.checkAdmin();
    this.isStudent = AuthorityUtil.checkStudent();
    console.log(this.isAdmin);
  }

  onEditItem(singleItem) {  this.dialogService.open(AddItemComponent,
    {closeOnBackdropClick: true , closeOnEsc: true, context: {singleItem}});
  }

  openOrder(dialog: TemplateRef<any>, item) {
    this.totalExpenses = 0;
    this.dialogService.open(dialog, { context: item });
  }

  calculateTotal(price , quantity) {
    this.totalExpenses =  (price * quantity);
  }

  orderItem(item , quantity) {
    this.orderDto.userId = Number(LocalStorageUtil.getStorage().userId);
    this.orderDto.item = item;
    this.orderDto.quantity = quantity;
    console.log(this.orderDto);
    this.orderService.save(this.orderDto).subscribe(value => {
      if (value.detail) {
        this.toastrService.show(value.detail.item.itemName + ' ordered successfully', 'Success!');
      }
    });
  }
}

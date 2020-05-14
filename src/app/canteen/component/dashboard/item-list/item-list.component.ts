import {Component, OnInit, TemplateRef} from '@angular/core';
import {Item} from '../../modal/Item';
import {ItemService} from '../configuration/add-item/item.service';
import {AddItemComponent} from '../configuration/add-item/add-item.component';
import {NbDialogService, NbToastrService} from '@nebular/theme';
import {AuthorityUtil} from '../../../../@core/utils/AuthorityUtil';
import {OrderService} from './order.service';
import {OrderDto} from '../../modal/orderDto';
import {LocalStorageUtil} from '../../../../@core/utils/local-storage-util';
import {SocketService} from '../notification/socket.service';
import {UserType} from "../../../../@core/userType";
import {TransactionType} from "../../../../@core/TransactionType";

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
})
export class ItemListComponent implements OnInit {

  constructor( private itemService: ItemService,
               private dialogService: NbDialogService,
               private orderService: OrderService,
               private toastrService: NbToastrService,
               private socketService: SocketService) { }

  item: Array<Item> = new Array<Item>();
  quantities = [1 , 2 , 3 , 4 , 5];
  agree = false;
  orderDto: OrderDto = new OrderDto();
  orderAble = false;
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
    this.orderAbleChecker(price * quantity);
  }

  orderItem(item , quantity) {
    this.orderDto.userId = Number(LocalStorageUtil.getStorage().userId);
    this.orderDto.item = item;
    this.orderDto.quantity = quantity;
    this.orderService.save(this.orderDto).subscribe(value => {
      if (value.detail) {
        this.sendOrderNotification();
        this.toastrService.show(value.detail.item.itemName + ' ordered successfully', 'Success!');
      }
    });
  }

  agreeChecker(chk) {
    this.agree = !!chk;
  }

 private  orderAbleChecker(amount: number) {
    this.orderAble = AuthorityUtil.isOrderable(amount);
  }

  sendOrderNotification(){
    const user =  LocalStorageUtil.getStorage();
    this.socketService.message.date = new Date();
    this.socketService.message.fromId = Number(user.userId);
    this.socketService.message.transactionType = TransactionType.ORDER;
    this.socketService.message.toRole = UserType.ADMIN;
    this.socketService.sendMessageUsingSocket();
  }
}

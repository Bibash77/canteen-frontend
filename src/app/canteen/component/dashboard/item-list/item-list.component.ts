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
import {UserType} from '../../../../@core/userType';
import {TransactionType} from '../../../../@core/TransactionType';
import {AudioUtils} from '../../../../@core/utils/AudioUtils';

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
    this.agree = false;
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
    console.log(this.orderDto);
    this.orderService.save(this.orderDto).subscribe(value => {
       if (value.detail) {
         console.log(value);
         this.orderDto.expenditure = value.detail.expenditure;
         this.orderDto.orderCode = value.detail.orderCode;
         this.sendOrderNotification(this.orderDto);
    /*     AudioUtils.playSound();*/
         this.toastrService.show(value.detail.item.itemName + ' ordered successfully', 'Order Code:' + value.detail.orderCode);
       }
     });
  }

  agreeChecker(chk) {
    this.agree = !!chk;
  }

 private  orderAbleChecker(amount: number) {
    this.orderAble = AuthorityUtil.isOrderable(amount);
  }

  sendOrderNotification(orderDto) {
    console.log(orderDto);
    console.log(this.orderDto);
    const user =  LocalStorageUtil.getStorage();
    this.socketService.message.date = new Date();
    this.socketService.message.fromId = Number(user.userId);
    this.socketService.message.fromRole = Number(user.roleType);
    this.socketService.message.transactionType = TransactionType.ORDER;
    this.socketService.message.transactionAmount = this.orderDto.expenditure;
    this.socketService.message.itemName =  this.orderDto.item.itemName;
    this.socketService.message.orderCode = this.orderDto.orderCode;
    this.socketService.message.quantity = this.orderDto.quantity;
    this.socketService.message.toRole = UserType.ADMIN;
    this.socketService.sendMessageUsingSocket();
  }
}

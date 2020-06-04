import {Component, Input, OnInit} from '@angular/core';
import {NbDialogRef, NbDialogService} from '@nebular/theme';

@Component({
  selector: 'app-order-profile',
  template: ` <nb-card status="primary">
    <nb-card-header class="text-center">Order Detail({{order?.itemName}})
    </nb-card-header>
    <nb-card-body>
        <div class="row">
         <table class="table">
           <tr>
             <td>Buyer</td>
             <td>{{order?.user?.fullName}}{{'(' +order?.user?.batch+')'}}</td>
           </tr>
          <tr>
            <td> Date</td>
            <td>{{order?.createdAt}}</td>
          </tr>
           <tr>
             <td>Item Price</td>
             <td>Rs {{order?.expenditure/order?.quantity}}</td>
           </tr>
           <tr>
             <td>Item Quantity</td>
             <td>{{order?.quantity}} Unit</td>
           </tr>
           <tr><td><b>Total Expenses</b></td>
           <td><b>{{order?.expenditure}} </b></td>
           </tr>
         </table>
        </div>
    </nb-card-body>
    <nb-card-footer>
      <button   hero nbButton status="danger" size="small" (click)="close()">close</button>
      <span class="float-right">
        <nb-icon *ngIf="order.orderStatus == 'PENDING'"
                 status="success"
                 icon="shopping-bag"></nb-icon>
        <nb-icon *ngIf="order.orderStatus == 'DELIVERED'"
                 icon="done-all" status="primary"></nb-icon>
        <nb-icon *ngIf="order.orderStatus == 'READY'"
                 icon="options" status="danger"></nb-icon>
      </span>
    </nb-card-footer>
  </nb-card>`,
  styles: [``]
})
export class OrderProfileComponent implements OnInit {
order: any;
orderDetails;
  constructor(public dialog: NbDialogRef<OrderProfileComponent>) { }

  ngOnInit() {
    this.orderDetails = this.order;
    console.log(this.orderDetails, this.order);
  }

  close() {
    this.dialog.close();
  }

}

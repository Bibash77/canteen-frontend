import { Component, OnInit } from '@angular/core';
import {NbDialogRef} from "@nebular/theme";

@Component({
  selector: 'app-top-up-profile',
  template: `<nb-card status="primary">
    <nb-card-header class="text-center">{{topUpDetails?.transactionType |titlecase}} Detail
    </nb-card-header>
    <nb-card-body>
      <div class="row">
        <table class="table">
          <tr>
            <td> Date</td>
            <td>{{topUpDetails?.createdAt | date}}</td>
          </tr>
          <tr>
            <td>Amount</td>
            <td>Rs.{{topUpDetails?.topUpAmount}}</td>
          </tr>
          <tr>
            <td>Remaining Balance</td>
            <td>Rs.{{topUpDetails?.remainingAmount}}</td>
          </tr>
        </table>
      </div>
    </nb-card-body>
    <nb-card-footer>
      <button   hero nbButton status="danger" size="small" (click)="close()">close</button>
    </nb-card-footer>
  </nb-card>`,
  styles: [``]
})
export class TopUpProfileComponent implements OnInit {
  topUpDetails: any;
  constructor(public dialog: NbDialogRef<TopUpProfileComponent>) { }

  ngOnInit() {
  }

  close() {
    this.dialog.close();
  }
}

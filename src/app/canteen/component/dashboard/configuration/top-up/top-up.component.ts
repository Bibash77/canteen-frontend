import {Component, OnInit} from '@angular/core';
import {NbDialogRef} from '@nebular/theme';
import {Wallet} from '../../../modal/wallet';
import {Router} from '@angular/router';

import {WalletService} from './wallet.service';

@Component({
  selector: 'app-top-up',
  template: `
    <nb-card status="primary">
    <nb-card-header>Top-Up Balance</nb-card-header>
    <nb-card-body>
      <div class="form-group">
        <label for="Top-Up">Top-Up Amount</label>
        <input nbInput fullWidth type="number" id="Top-Up" placeholder="Enter amount to Top-Up" name="depositAmount"
               class="form-control" [(ngModel)]="wallet.depositAmount" minlength="2" required #amount="ngModel">
      </div>
    </nb-card-body>
    <nb-card-footer>
      <button nbButton hero status="danger" size="small" (click)="closeTopUp()">Cancel</button>
      <button nbButton hero status="primary" size="small" class="float-right" (click)="save()" [disabled]="amount.invalid">submit</button>
    </nb-card-footer>
  </nb-card>`,
})
export class TopUpComponent implements OnInit {
   user: any;
   wallet: Wallet = new Wallet();

  constructor(private walletService: WalletService,
              private dialogref: NbDialogRef<TopUpComponent>,
              private router: Router) { }

  ngOnInit() {
  }

  save() {
    const wallet: Wallet = new Wallet();
    wallet.depositAmount = this.wallet.depositAmount;
    wallet.user = this.user;
    this.walletService.topUp(wallet).subscribe(value => {
      alert('sucessfully deposit');
      this.router.navigateByUrl('/canteen/dashboard').then( () => {
        this.router.navigate(['/canteen/configuration']);
      });
    });
  }

  closeTopUp() {
    this.dialogref.close();
  }
}

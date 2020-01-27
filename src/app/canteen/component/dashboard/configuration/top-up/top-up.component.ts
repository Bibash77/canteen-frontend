import {Component, OnInit} from '@angular/core';
import {NbDialogRef} from '@nebular/theme';
import {Wallet} from '../../../modal/wallet';
import {WallletService} from './walllet-service.service';
import {Router} from "@angular/router";

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
      <div *ngIf="amount.valid">
      <button nbButton hero status="primary" size="small" class="float-right" (click)="save()">Save</button>
      </div>
    </nb-card-footer>
  </nb-card>`,
  styleUrls: ['./top-up.component.scss']
})
export class TopUpComponent implements OnInit {
   user: any;
   wallet: Wallet = new Wallet();

  constructor(private walletService: WallletService,
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
}

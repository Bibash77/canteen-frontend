import { Component, OnInit } from '@angular/core';
import {AuthorityUtil} from '../../../../@core/utils/AuthorityUtil';

@Component({
  selector: 'app-inactive-user-handler',
  template: `<nb-layout>
    <nb-layout-column class="bg-white">
    <app-header></app-header>
    <div *ngIf="!checkUserActive()" class="card text-center mt-4">
    <div class="card-header">
      Activation Error !
    </div>
    <div class="card-body">
      <h5 class="card-title">You are Inactive!!</h5>
      <p class="card-text">Please Contact College Administrator and activate account.</p>
      <a>Top-Up account to place Order</a>
    </div>
    <div class="card-footer text-muted">
      <nb-icon icon="alert-triangle-outline"></nb-icon>
    </div>
  </div>
    </nb-layout-column>
  </nb-layout>`,
  styles: []
})
export class InactiveUserHandlerComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  checkUserActive() {
    return AuthorityUtil.isUserActive();
  }

}

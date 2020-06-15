import { Component, OnInit } from '@angular/core';
import {AuthorityUtil} from '../../../../@core/utils/AuthorityUtil';

@Component({
  selector: 'app-inactive-user-handler',
  template: `<nb-layout>
    <nb-layout-column >
      <nb-layout-header class="bg-white">
        <app-header></app-header></nb-layout-header>
      <div>
    <div class="card text-center mt-4">
    <div class="card-header grad-primary">
     <strong> Activation Error !</strong>
    </div>
    <div class="card-body grad-primary">
      <img src="../../../../assets/images/avatar.png" class="card-img-top img-responsive" style="width: 300px; min-height: 400px" alt="...">
      <h5 class="card-title">You are Inactive!!</h5>
      <p class="card-text">Please Contact College Administrator and activate account.</p>
      <a>Top-Up account to place Order</a>
    </div>
    <div class="card-footer text-muted grad-primary">
      <nb-icon icon="alert-triangle-outline" status="danger" ></nb-icon>
    </div>
  </div>
      </div>
    </nb-layout-column>
  </nb-layout>`,
  styles: [``]
})
export class InactiveUserHandlerComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  checkUserActive() {
    return AuthorityUtil.isUserActive();
  }

}

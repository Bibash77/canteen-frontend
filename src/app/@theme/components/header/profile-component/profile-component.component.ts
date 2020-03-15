import {Component, OnInit} from '@angular/core';
import {LocalStorageUtil} from '../../../../@core/utils/local-storage-util';

@Component({
  selector: 'app-profile-component',
  template: `
    <nb-card accent="primary">
      <nb-card-body>
        <nb-user size="large"
                 [name]="user.username"
                 [title]="'Current Balance: Rs'+user.currentBalance"
                 color="#338BC6">
        </nb-user>
      </nb-card-body>
    </nb-card>`,
  styleUrls: ['./profile-component.component.scss']
})
export class ProfileComponent implements OnInit {
  user;

  constructor() {
  }

  ngOnInit() {
    this.user = LocalStorageUtil.getStorage();
  }

}

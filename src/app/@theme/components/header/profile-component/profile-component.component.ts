import {Component, OnInit} from '@angular/core';
import {LocalStorageUtil} from '../../../../@core/utils/local-storage-util';

@Component({
  selector: 'app-profile-component',
  template: `
    <nb-card accent="info">
      <nb-card-body>
        <nb-user size="large"
                 [name]="user?.fullName"
                 color="#338BC6">
        </nb-user>
        <div class="row">
          <table class="table table-hover">
            <tr>
              <td>UserName:</td>
              <td>{{user?.username}}</td>
            </tr>
            <tr>
              <td> Current Balance:</td>
              <td>Rs {{user.currentBalance}}</td>
            </tr>
          </table>
        </div>
      </nb-card-body>
    </nb-card>
  `,
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

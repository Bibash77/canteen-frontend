import {Component, OnInit} from '@angular/core';
import {LocalStorageUtil} from '../../../../@core/utils/local-storage-util';
import {NbDialogRef} from '@nebular/theme';

@Component({
  selector: 'app-profile-component',
  template: `
    <!--<nb-card accent="info">
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
    </nb-card>-->
    <nb-card status="primary">
      <nb-card-header class="text-center">User Detail
      </nb-card-header>
      <nb-card-body>
        <div class="row">
          <table class="table">
            <tr>
              <td>Full Name</td>
              <td>{{user?.fullName}}</td>
            </tr>
            <tr>
              <td> User Name</td>
              <td>{{user?.username}}</td>
            </tr>
            <tr>
              <td> Current Balance:</td>
              <td>Rs {{user.currentBalance}}</td>
            </tr>
          </table>
        </div>
      </nb-card-body>
      <nb-card-footer>
        <button   hero nbButton status="danger" size="small" (click)="close()">close</button>
      </nb-card-footer>
    </nb-card>
  `,
  styleUrls: ['./profile-component.component.scss']
})
export class ProfileComponent implements OnInit {
  user;

  constructor(public dialog: NbDialogRef<ProfileComponent>) {
  }

  ngOnInit() {
    this.user = LocalStorageUtil.getStorage();
  }

  close() {
    this.dialog.close();
  }

}

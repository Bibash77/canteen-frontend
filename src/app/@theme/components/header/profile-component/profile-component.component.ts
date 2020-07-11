import {Component, OnInit} from '@angular/core';
import {LocalStorageUtil} from '../../../../@core/utils/local-storage-util';
import {NbDialogRef} from '@nebular/theme';

@Component({
  selector: 'app-profile-component',
  template: `
    <nb-card status="info">
      <nb-card-header class="text-center">
        <span class="float-right cursor"><a (click)="close();">x</a></span>
        <nb-user size="large"
                 [name]="user?.fullName | uppercase"
                 [title]="user?.roleType | titlecase"
                 color="white"
                 picture="../../../../assets/images/avatar.png">
        </nb-user>
      </nb-card-header>
      <nb-card-body>
        <p><nb-icon icon="email-outline" class="mt-2"></nb-icon>:<b>{{ user?.email  }}</b></p>
        <div class="row">
          <div class="col-md-12">
            <div class="row">
              <div class="col-md-12 table-responsive">
                <table class="table table-bordered table-hover">
                  <tr>
                    <td>Username:</td>
                    <td>{{ user?.username }}</td>
                  </tr>
                  <tr>
                    <td> Current Balance:</td>
                    <td>Rs <b [ngStyle]="{'color': user?.currentBalance <= 100 ? 'red' : 'blue' }">{{user.currentBalance}}</b></td>
                  </tr>
                  <tr>
                    <td>Batch year:</td>
                    <td>
                      {{ user?.batch}}
                    </td>
                  </tr>
                  <tr>
                    <td>User Status:</td>
                    <td>
                      {{ user?.status  | titlecase}}
                    </td>
                  </tr>
                </table>
              </div>
            </div>
          </div>
        </div>
      </nb-card-body>
    </nb-card>

  `,
  styleUrls: ['./profile-component.component.scss']
})
export class ProfileComponent implements OnInit {
  user;

  constructor(
    public dialog: NbDialogRef<ProfileComponent>,
  ) {
  }

  ngOnInit() {
    this.user = LocalStorageUtil.getStorage();
  }

  close() {
    this.dialog.close();
  }

}

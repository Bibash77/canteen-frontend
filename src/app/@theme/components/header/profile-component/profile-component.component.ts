import {Component, OnInit} from '@angular/core';
import {LocalStorageUtil} from '../../../../@core/utils/local-storage-util';
import {NbDialogRef} from '@nebular/theme';

@Component({
  selector: 'app-profile-component',
  template: `
    <nb-card accent="primary">
      <nb-card-header class="text-center">
        <span class="float-right"><a (click)="close();">x</a></span>
        <img
          #imgProfilePicture
          alt="avatar"
          class="avatar cursor img-responsive mb-1"
          src="../../../../assets/images/avatar.png"
        />
        <h5>{{ user?.fullName }} Profile</h5>
        <p><nb-icon icon="email-outline" class="mt-2"></nb-icon>:<b>{{ user?.email  }}</b></p>
      </nb-card-header>
      <nb-card-body>
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
                    <td>User Type:</td>
                    <td>{{user?.roleType | titlecase}}</td>
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

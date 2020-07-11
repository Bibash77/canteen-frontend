import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NbDialogRef} from '@nebular/theme';
import {ProfileComponent} from '../profile-component/profile-component.component';

@Component({
  selector: 'app-change-password',
  template: `<nb-card status="info">
    <nb-card-header class="text-center">
      <span class="float-right cursor"><a (click)="onClose();">x</a></span>
      Change Password</nb-card-header>
    <nb-card-body>
      <div class="row">
          <div class="col-md-12">
            <div class="form-group">
              <form (ngSubmit)="onChangePassword()" [formGroup]="passwordForm" >
                <label>
                  Old Password:
                  <input class="form-control" type="password" formControlName="oldPassword" maxlength="50">
                </label><br>
                <label>
                  New Password:
                  <input class="form-control" type="password" formControlName="newPassword" maxlength="50">
                </label><br>
                <label>
                  Confirm Password:
                  <input class="form-control" type="password" formControlName="confirmPassword" maxlength="50">
                </label>
                <br>
                <button class="btn btn-sm btn-outline-info float-right" type="submit"
                        [disabled]="!passwordForm.valid">Submit</button>
                <label *ngIf="error!= null" class="alert alert-danger">
                  {{error}}
                </label>
              </form>
            </div>
          </div>
      </div>
    </nb-card-body>
  </nb-card>`,
  styles: ['']
})
export class ChangePasswordComponent implements OnInit {
  error: string;
  passwordForm: FormGroup;
  changePasswordObject = {
    username: undefined,
    oldPassword: undefined,
    newPassword: undefined
  };
  constructor(private formBuilder: FormBuilder,
              public dialog: NbDialogRef<ProfileComponent>) { }

  ngOnInit() {
    this.passwordForm = this.formBuilder.group({
      oldPassword: [undefined, Validators.required],
      newPassword: [undefined, Validators.required],
      confirmPassword: [undefined, Validators.required]
    });
  }

  onChangePassword() {

  }

  onClose() {
    this.dialog.close();
  }
}

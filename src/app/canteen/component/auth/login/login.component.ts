import {Component, OnInit} from '@angular/core';
import {NbDialogService, NbToastrService} from '@nebular/theme';
import {RegisterComponent} from '../register/register.component';
import {UserService} from '../user.service';
import {Router} from '@angular/router';
import {LocalStorageUtil} from '../../../../@core/utils/local-storage-util';
import {ObjectUtil} from '../../../../@core/utils/ObjectUtil';
import {Status} from '../../../../@core/Status';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  spinner = false;
  duration = 0;
  loginForm: FormGroup;

  constructor(private dialogService: NbDialogService,
              private userService: UserService,
              private router: Router,
              private toasterService: NbToastrService,
              private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.buildForm();
  }

  onRegister() {
    this.dialogService.open(RegisterComponent);
  }

  buildForm() {
    this.loginForm =  this.formBuilder.group({
      userName: [undefined , Validators.required],
      password: [undefined , Validators.required]
    });
  }

  onSubmit() {
    if(this.loginForm.invalid) {
      this.toasterService.danger('UserName and Password required' , 'Invalid!!' );
      return;
    }
    this.spinner = true;
    const datas = {
      userName: this.loginForm.get('userName').value,
      password: this.loginForm.get('userName').value
    };
    this.userService.login(datas).subscribe((data: any) => {
        if (!ObjectUtil.isEmpty(data.detail.id)) {
         const storage = LocalStorageUtil.getStorage();
         storage.roleType = data.detail.roleType;
         storage.username = data.detail.userName;
         storage.status = data.detail.status;
         storage.fullName = data.detail.fullName;
         storage.email = data.detail.email;
         storage.batch = data.detail.batch;
         console.log(data.detail.status === Status.INACTIVE.toString() , data.detail.status , Status.INACTIVE.toString());
         if (data.detail.status === Status.INACTIVE.toString()) {
           LocalStorageUtil.setStorage(storage);
           this.router.navigateByUrl('/user-inactive');
           return;
         }
         storage.userId = (data.detail.id).toString();
         storage.currentBalance = data.detail.walletAmount;
         storage.userCode = data.detail.userCode;
         LocalStorageUtil.setStorage(storage);
         this.spinner = false;
         this.router.navigateByUrl('/canteen/dashboard');
       } else {
         this.spinner = false;
         this.toasterService.danger('Invalid user name or password' , 'Error', {duration: this.duration} );
       }
      },
      error => {
        console.error(error);
      }
    );
  }
}

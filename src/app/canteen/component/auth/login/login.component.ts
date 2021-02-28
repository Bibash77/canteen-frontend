import {Component, OnInit} from '@angular/core';
import {NbDialogService, NbToastrService} from '@nebular/theme';
import {RegisterComponent} from '../register/register.component';
import {UserService} from '../user.service';
import {Router} from '@angular/router';
import {LocalStorageUtil} from '../../../../@core/utils/local-storage-util';
import {ObjectUtil} from '../../../../@core/utils/ObjectUtil';
import {Status} from '../../../../@core/Status';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ApiConfig} from '../../../../@core/utils/ApiConfig';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  spinner = false;
  duration = 0;
  loginForm: FormGroup;

  securityUrl = ApiConfig.TOKEN;
  private headers = new HttpHeaders({
    'Content-Type': 'application/x-www-form-urlencoded',
    Authorization: 'Basic RGl2eWEtQ2FudGVlbjpEaXZ5YUd5YW4xMjMqIyo=',
  });

  constructor(private dialogService: NbDialogService,
              private userService: UserService,
              private router: Router,
              private http: HttpClient,
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
    this.loginForm = this.formBuilder.group({
      userName: [undefined, Validators.required],
      password: [undefined, Validators.required]
    });
  }

  async onSubmit() {
    if (this.loginForm.invalid) {
      this.toasterService.danger('Invalid user name or password', 'Error', {duration: this.duration});
      return;
    }
    this.spinner = true;
    const datas = `grant_type=password&username=${this.loginForm.get('userName').value}&password=${
      this.loginForm.get('password').value}`;
    console.log(datas);
    console.log(this.securityUrl, this.headers, ApiConfig.TOKEN, ApiConfig.URL);
    await this.http.post(this.securityUrl, datas.toString(), {headers: this.headers})
      .subscribe(async (responseToken: any) => {
        console.log('asdasd');
        const storage = LocalStorageUtil.getStorage();
        storage.at = responseToken.access_token;
        storage.rt = responseToken.refresh_token;
        storage.ty = responseToken.token_type;
        storage.et = responseToken.expires_in;
        LocalStorageUtil.setStorage(storage);
        console.log(storage.at);

        await this.userService.getLoggedInUser().toPromise().then(async (data: any) => {
            if (!ObjectUtil.isEmpty(data.detail.id)) {
              const storage = LocalStorageUtil.getStorage();
              storage.roleType = data.detail.roleType;
              storage.username = data.detail.username;
              storage.status = data.detail.status;
              storage.fullName = data.detail.fullName;
              storage.email = data.detail.email;
              storage.batch = data.detail.batch;
              if (data.detail.status === Status.INACTIVE.toString()) {
                LocalStorageUtil.setStorage(storage);
                await this.router.navigateByUrl('/user-inactive');
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
              this.toasterService.danger('Invalid user name or password', 'Error', {duration: this.duration});
            }
          },
          error => {
            this.spinner = false;
            console.error(error);
            this.toasterService.danger('Invalid user name or password', 'Error', {duration: this.duration});
          }
        );
      } , error => {
        this.spinner = false;
        console.error(error);
        this.toasterService.danger('Invalid user name or password', 'Error', {duration: this.duration});

      });
  }
}

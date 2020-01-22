import { Component, OnInit } from '@angular/core';
import { NbDialogService} from '@nebular/theme';
import {RegisterComponent} from '../register/register.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
spinner = false;

  constructor(private dialogService: NbDialogService) { }

  ngOnInit() {
  }

onRegister() {
    this.dialogService.open(RegisterComponent);
}
onSubmit(loginForm) {
const user = {
  userName: loginForm.userName,
  password: loginForm.password
};
}
}

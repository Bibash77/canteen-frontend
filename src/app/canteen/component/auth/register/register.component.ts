import {Component, OnInit} from '@angular/core';
import {NbDialogRef} from '@nebular/theme';
import {UserService} from '../user.service';
import {User} from '../../modal/user';
import {UserType} from "../../../../@core/userType";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  constructor(
              private userService: UserService,
              public dialog: NbDialogRef<RegisterComponent>) { }
  user: User = new User();

  buildForm() {
  }


  addUser(registerForm) {
    this.user.roleType = UserType.STUDENT;
    console.log("roletype" , this.user.roleType);
    if (this.confirmPasswordChecker(registerForm)) {
      this.userService.registerUser(this.user).subscribe(value => {
        alert('login to continue');
      });
    }  else {
      alert('Confirm password didnt matched');
    }
  }

  confirmPasswordChecker(index) {
    let isPasswordMatch = false;
    const password = null;
    const confirmPassword = null;
    if (password === confirmPassword) {
      isPasswordMatch = true;
    }
    return isPasswordMatch;
  }

  onDismiss() {

    this.dialog.close();
  }

  ngOnInit(): void {
    this.buildForm();
  }
}

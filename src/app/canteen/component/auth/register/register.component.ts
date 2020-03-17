import {Component, OnInit} from '@angular/core';
import {NbDialogRef, NbToastrService} from '@nebular/theme';
import {UserService} from '../user.service';
import {User} from '../../modal/user';
import {UserType} from '../../../../@core/userType';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  constructor(
              private userService: UserService,
              public dialog: NbDialogRef<RegisterComponent>,
              private router: Router,
              private nbToastrService: NbToastrService) { }
  user: User = new User();

  buildForm() {
  }


  addUser(registerForm) {
    this.user.roleType = UserType.STUDENT;
    console.log('roletype' , this.user.roleType);
    if (this.confirmPasswordChecker()) {
      this.userService.registerUser(this.user).subscribe(value => {
        alert('');
        this.onDismiss();
        this.router.navigateByUrl('').then(() => {
          this.nbToastrService.success('login to continue', 'Success!');
          }
        );
      });
    }  else {
      this.nbToastrService.warning('Confirm password didnt matched', 'Error');
    }
  }

  confirmPasswordChecker() {
    return this.user.password === this.user.confirmPassword;
  }

  onDismiss() {
    this.dialog.close();
  }

  ngOnInit(): void {
    this.buildForm();
  }
}

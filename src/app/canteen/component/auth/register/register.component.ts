import {Component, OnInit} from '@angular/core';
import {NbDialogRef, NbToastrService} from '@nebular/theme';
import {UserService} from '../user.service';
import {User} from '../../modal/user';
import {UserType} from '../../../../@core/userType';
import {Router} from '@angular/router';
import {OtherUtils} from '../../../../@core/utils/OtherUtils';
import {AuthorityUtil} from '../../../../@core/utils/AuthorityUtil';

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
  batchList = [];

  buildForm() {
  }


  addUser(registerForm) {
    this.user.roleType = UserType.STUDENT;
    console.log('roletype' , this.user.roleType);
    if (this.confirmPasswordChecker()) {
      this.userService.registerUser(this.user).subscribe(value => {
        this.onDismiss();
        this.router.navigateByUrl('').then(() => {
          this.nbToastrService.success('login to continue', 'Success!', OtherUtils.getIconConfig('person-done-outline'));
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
    this.batchList = OtherUtils.batchGenerator();
  }
}

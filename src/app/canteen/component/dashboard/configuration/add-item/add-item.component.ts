import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormGroup} from '@angular/forms';
import {User} from '../../../modal/user';
import {UserService} from "../../../auth/user.service";

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.scss']
})
export class AddItemComponent implements OnInit {
  registerForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private userService: UserService) { }
   user: User = new User();
  ngOnInit() {
  }

  buildForm() {
    this.registerForm = this.formBuilder.group({});
  }

  addForm() {
    (this.registerForm.get('registerField') as FormArray).push(
      this.formBuilder.group(
        {
          itemName: [undefined],
          cookingTime: [undefined],
          rate: [undefined],
          itemStatus: [undefined],
        }
      )
    );
  }
}

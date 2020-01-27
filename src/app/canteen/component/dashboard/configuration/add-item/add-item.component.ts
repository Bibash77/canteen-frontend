import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormGroup} from '@angular/forms';
import {User} from '../../../modal/user';
import {ItemService} from './item.service';
import {NbDialogRef} from '@nebular/theme';
import { Router} from '@angular/router';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.scss']
})
export class AddItemComponent implements OnInit {
  form: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private itemService: ItemService,
              public dialog: NbDialogRef<AddItemComponent>,
              private router: Router) { }
  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.form = this.formBuilder.group(
      {
        itemName: [undefined],
        cookingTime: [undefined],
        price: [undefined],
        itemStatus: [undefined],
      }
    );
  }

  onSubmit() {
    console.log(this.form.value);
    this.dialog.close();
    this.itemService.save(this.form.value).subscribe(value => {
      this.router.navigateByUrl('/canteen/dashboard').then( () => {
          this.router.navigate(['/canteen/configuration']);
      });
  });
  }

}

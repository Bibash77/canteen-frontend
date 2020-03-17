import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormGroup} from '@angular/forms';
import {User} from '../../../modal/user';
import {ItemService} from './item.service';
import {NbDialogRef, NbToastrService} from '@nebular/theme';
import { Router} from '@angular/router';
import {Item} from '../../../modal/Item';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html'
})
export class AddItemComponent implements OnInit {
  form: FormGroup;
  singleItem: Item;
  constructor(private formBuilder: FormBuilder,
              private itemService: ItemService,
              public dialog: NbDialogRef<AddItemComponent>,
              private toastrService: NbToastrService,
              private router: Router) { }
  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.form = this.formBuilder.group(
      {
        id: [this.singleItem !== undefined ? this.singleItem.id : undefined],
        itemName: [this.singleItem !== undefined ? this.singleItem.itemName : undefined],
        cookingTime: [this.singleItem !== undefined ? this.singleItem.cookingTime : undefined],
        price: [this.singleItem !== undefined ? this.singleItem.price : undefined],
        itemStatus: [this.singleItem !== undefined ? this.singleItem.itemStatus : null],
      }
    );
  }

  onSubmit() {
    this.dialog.close();
    this.itemService.save(this.form.value).subscribe(value => {
      if(value.detail) {
        this.router.navigateByUrl('/canteen/dashboard').then( () => {
          this.router.navigate(['/canteen/configuration']).then(() => {

            this.toastrService.success('successfully added ' + this.form.get('itemName').value, 'Success');
          });
        });
      } else {
        this.toastrService.success('fail to add ' + this.form.get('itemName').value, 'Error');
      }
  });
  }

  closeDialog() {
    this.dialog.close();
  }

}

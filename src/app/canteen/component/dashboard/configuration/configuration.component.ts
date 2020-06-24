import { Component, OnInit } from '@angular/core';
import {NbDialogService, NbWindowService} from '@nebular/theme';
import { AddItemComponent } from './add-item/add-item.component';
import {Item} from '../../modal/Item';
import {ItemService} from './add-item/item.service';
import {UserService} from '../../auth/user.service';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html'
})
export class ConfigurationComponent implements OnInit {
  constructor(private dialogService: NbDialogService,
              private itemService: ItemService,
              private window: NbWindowService,
              private userService: UserService) { }

  item: Array<Item> = new Array<Item>();
  isAdmin;

  static loadData(configure: ConfigurationComponent) {
    configure.itemService.getAll().subscribe(value => {
    configure.item = value.detail;
  });
  }

  ngOnInit() {
    ConfigurationComponent.loadData(this);
  }
  onAddItem() {
this.dialogService.open(AddItemComponent);
  }

}

import { Component, OnInit } from '@angular/core';
import {Item} from '../../modal/Item';
import {ItemService} from '../configuration/add-item/item.service';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss']
})
export class ItemListComponent implements OnInit {

  constructor( private itemService: ItemService,) { }

  item: Array<Item> = new Array<Item>();

  static loadData(configure: ItemListComponent) {
    configure.itemService.getAll().subscribe(value => {
      console.log(value.detail);
      configure.item = value.detail;
    });
  }

  ngOnInit() {
    ItemListComponent.loadData(this);
  }

}

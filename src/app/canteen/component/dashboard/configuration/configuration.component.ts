import { Component, OnInit } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { AddItemComponent } from './add-item/add-item.component';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.scss']
})
export class ConfigurationComponent implements OnInit {

  constructor(private dialogService: NbDialogService) { }

  ngOnInit() {
  }

  onAddItem() {
this.dialogService.open(AddItemComponent);
  }
}

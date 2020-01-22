import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {CanteenRoutingModule} from './canteen-routing.module';
import {CanteenComponent} from './canteen.component';
import {ThemeModule} from '../@theme/theme.module';
import {DashboardComponent} from './component/dashboard/dashboard.component';
import {NbAccordionModule, NbCardModule, NbToggleModule} from '@nebular/theme';
import { ConfigurationComponent } from './component/dashboard/configuration/configuration.component';
import { NotificationComponent } from './component/dashboard/notification/notification.component';
import { AddItemComponent } from './component/dashboard/configuration/add-item/add-item.component';
import {NbDialogModule, NbInputModule} from '@nebular/theme';


@NgModule({
  declarations: [CanteenComponent, DashboardComponent, ConfigurationComponent, NotificationComponent, AddItemComponent],
  imports: [
    CommonModule,
    CanteenRoutingModule,
    ThemeModule,
    NbAccordionModule,
    NbToggleModule,
    NbDialogModule.forRoot(),
  ],
  entryComponents: [AddItemComponent]
})
export class CanteenModule {
}

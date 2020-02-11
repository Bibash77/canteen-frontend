import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {CanteenRoutingModule} from './canteen-routing.module';
import {CanteenComponent} from './canteen.component';
import {ThemeModule} from '../@theme/theme.module';
import {DashboardComponent} from './component/dashboard/dashboard.component';
import {
  NbAccordionModule, NbInputModule,
  NbListModule,
  NbStepperModule, NbTabsetModule,
  NbToggleModule, NbWindowModule
} from '@nebular/theme';
import { ConfigurationComponent } from './component/dashboard/configuration/configuration.component';
import { NotificationComponent } from './component/dashboard/notification/notification.component';
import { AddItemComponent } from './component/dashboard/configuration/add-item/add-item.component';
import {NbDialogModule} from '@nebular/theme';
import { TopUpComponent } from './component/dashboard/configuration/top-up/top-up.component';
import { UserConfigComponent } from './component/dashboard/configuration/user-config/user-config.component';
import { ItemListComponent } from './component/dashboard/item-list/item-list.component';


@NgModule({
  declarations: [CanteenComponent, DashboardComponent, ConfigurationComponent,
    NotificationComponent, AddItemComponent, TopUpComponent, UserConfigComponent, ItemListComponent],
  imports: [
    CommonModule,
    CanteenRoutingModule,
    ThemeModule,
    NbAccordionModule,
    NbToggleModule,
    NbDialogModule.forRoot(),
    NbWindowModule.forRoot(),
    NbListModule,
    NbStepperModule,
    NbTabsetModule,
    NbInputModule,
  ],
  entryComponents: [AddItemComponent , TopUpComponent]
})
export class CanteenModule {
}

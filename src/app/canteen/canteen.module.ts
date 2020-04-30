import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {CanteenRoutingModule} from './canteen-routing.module';
import {CanteenComponent} from './canteen.component';
import {ThemeModule} from '../@theme/theme.module';
import {DashboardComponent} from './component/dashboard/dashboard.component';
import {
  NbAccordionModule, NbDatepickerModule, NbInputModule,
  NbListModule, NbRadioModule,
  NbStepperModule, NbTabsetModule, NbToastrModule,
  NbToggleModule, NbTooltipModule, NbWindowModule
} from '@nebular/theme';
import {ConfigurationComponent} from './component/dashboard/configuration/configuration.component';
import {NotificationComponent} from './component/dashboard/notification/notification.component';
import {AddItemComponent} from './component/dashboard/configuration/add-item/add-item.component';
import {NbDialogModule} from '@nebular/theme';
import {TopUpComponent} from './component/dashboard/configuration/top-up/top-up.component';
import {UserConfigComponent} from './component/dashboard/configuration/user-config/user-config.component';
import {ItemListComponent} from './component/dashboard/item-list/item-list.component';
import {UserTransactionComponent} from './component/dashboard/history/user-transaction/user-transaction.component';
import {KitchenerServeComponent} from './component/dashboard/notification/kitchener-serve/kitchener-serve.component';
import {OrdersComponent} from './component/dashboard/history/user-transaction/orders/orders.component';
import {OrderProfileComponent} from './component/dashboard/history/user-transaction/order-profile/order-profile.component';
import {TopUpProfileComponent} from './component/dashboard/history/user-transaction/top-up-profile/top-up-profile.component';


@NgModule({
  declarations: [CanteenComponent, DashboardComponent, ConfigurationComponent,
    NotificationComponent, AddItemComponent, TopUpComponent, UserConfigComponent,
    ItemListComponent, UserTransactionComponent, KitchenerServeComponent, OrdersComponent,
    OrderProfileComponent, TopUpProfileComponent],
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
    NbRadioModule,
    NbTooltipModule,
    NbDatepickerModule,
    NbToastrModule.forRoot({duration: 0})
  ],
  entryComponents: [AddItemComponent, TopUpComponent, OrderProfileComponent, TopUpProfileComponent]
})
export class CanteenModule {
}

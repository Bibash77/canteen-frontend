import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {CanteenRoutingModule} from './canteen-routing.module';
import {CanteenComponent} from './canteen.component';
import {ThemeModule} from '../@theme/theme.module';
import {DashboardComponent} from './component/dashboard/dashboard.component';


@NgModule({
  declarations: [CanteenComponent, DashboardComponent],
  imports: [
    CommonModule,
    CanteenRoutingModule,
    ThemeModule
  ]
})
export class CanteenModule {
}

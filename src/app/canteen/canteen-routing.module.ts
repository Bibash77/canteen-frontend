import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CanteenComponent} from './canteen.component';
import {DashboardComponent} from './component/dashboard/dashboard.component';
import {ConfigurationComponent} from './component/dashboard/configuration/configuration.component';
import {NotificationComponent} from './component/dashboard/notification/notification.component';
import {UserTransactionComponent} from './component/dashboard/history/user-transaction/user-transaction.component';

const routes: Routes = [
  {
    path: '',
    component: CanteenComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'configuration',
        component: ConfigurationComponent
      },
      {
        path: 'notification',
        component: NotificationComponent
      },
      {
        path: 'transaction/:id',
        component: UserTransactionComponent
      },
      {
        path: '**',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CanteenRoutingModule { }

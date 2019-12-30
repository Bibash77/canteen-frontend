import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CanteenComponent} from './canteen.component';
import {DashboardComponent} from './component/dashboard/dashboard.component';


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
        path: '',
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

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './canteen/component/auth/login/login.component';
import {InactiveUserHandlerComponent} from './canteen/component/dashboard/inactive-user-handler/inactive-user-handler.component';


const routes: Routes = [
  {path: '' , component: LoginComponent},
  {path: 'login' , component: LoginComponent},
  {path: 'user-inactive', component: InactiveUserHandlerComponent},
  {
    path: 'canteen',
    loadChildren: () => import('./canteen/canteen.module')
    .then(m => m.CanteenModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

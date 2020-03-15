import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './canteen/component/auth/login/login.component';


const routes: Routes = [
  {path: '' , component: LoginComponent},
  {path: 'login' , component: LoginComponent},
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

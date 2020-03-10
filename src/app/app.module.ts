import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HashLocationStrategy, LocationStrategy} from '@angular/common';
import {CoreModule} from './@core/core.module';
import {ThemeModule} from './@theme/theme.module';
import {LoginComponent} from './canteen/component/auth/login/login.component';
import {NbDatepickerModule, NbDialogModule, NbInputModule, NbToastrModule} from '@nebular/theme';
import {RegisterComponent} from './canteen/component/auth/register/register.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import {NgbPaginationModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CoreModule.forRoot(),
    ThemeModule.forRoot(),
    ThemeModule,
    NbDatepickerModule.forRoot(),
    NbDialogModule.forChild(),
    NbToastrModule.forRoot({}),
    NbInputModule,
    NgbPaginationModule,
  ],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}],
  entryComponents: [
    RegisterComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

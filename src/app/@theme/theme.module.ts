import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
  NbActionsModule,
  NbButtonModule, NbCardModule, NbCheckboxModule,
  NbContextMenuModule, NbDatepickerModule, NbDialogModule,
  NbIconModule,
  NbLayoutModule,
  NbMenuModule,
  NbSearchModule,
  NbSelectModule,
  NbSidebarModule,
  NbThemeModule, NbToastrModule,
  NbUserModule, NbWindowModule,
} from '@nebular/theme';
import {NbEvaIconsModule} from '@nebular/eva-icons';

import {
  FooterComponent,
  HeaderComponent,
} from './components';
import {CapitalizePipe, NumberWithCommasPipe, PluralPipe, RoundPipe, TimingPipe, } from './pipes';
import {
  OneColumnLayoutComponent,
  ThreeColumnsLayoutComponent,
  TwoColumnsLayoutComponent,
} from './layouts';
import {DEFAULT_THEME} from './styles/theme.default';
import {COSMIC_THEME} from './styles/theme.cosmic';
import {CORPORATE_THEME} from './styles/theme.corporate';
import {DARK_THEME} from './styles/theme.dark';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {PagingComponent} from './components/paging/paging.component';
import {NgbPaginationModule} from '@ng-bootstrap/ng-bootstrap';
import {IconCardComponent} from './iconcard/icon-card.component';
import { ProfileComponent } from './components/header/profile-component/profile-component.component';
import { ChangePasswordComponent } from './components/header/change-password/change-password.component';

const BASE_MODULES = [CommonModule, RouterModule, FormsModule, ReactiveFormsModule];

const NB_MODULES = [
  NbLayoutModule,
  NbMenuModule,
  NbUserModule,
  NbActionsModule,
  NbSearchModule,
  NbSidebarModule,
  NbContextMenuModule,
  NbButtonModule,
  NbSelectModule,
  NbIconModule,
  NbEvaIconsModule,
  NbCardModule,
  NbCheckboxModule,
];

const OTHER_MODULES = [];

const COMPONENTS = [
  HeaderComponent,
  FooterComponent,
  OneColumnLayoutComponent,
  ThreeColumnsLayoutComponent,
  TwoColumnsLayoutComponent,
  PagingComponent,
  IconCardComponent
];

const ENTRY_COMPONENTS = [
  ChangePasswordComponent
];

const PIPES = [
  CapitalizePipe,
  PluralPipe,
  RoundPipe,
  TimingPipe,
  NumberWithCommasPipe,
];

const NB_THEME_PROVIDERS = [
  ...NbThemeModule.forRoot(
    {
      name: 'default',
    },
    [DEFAULT_THEME, COSMIC_THEME, CORPORATE_THEME, DARK_THEME],
  ).providers,
  ...NbSidebarModule.forRoot().providers,
  ...NbMenuModule.forRoot().providers,
  ...NbDatepickerModule.forRoot().providers,
  ...NbDialogModule.forRoot().providers,
  ...NbWindowModule.forRoot().providers,
  ...NbToastrModule.forRoot({duration: 0}).providers,
];

@NgModule({
  imports: [...BASE_MODULES, ...NB_MODULES, ...OTHER_MODULES, NgbPaginationModule],
  exports: [...BASE_MODULES, ...NB_MODULES, ...OTHER_MODULES, ...PIPES, ...COMPONENTS],
  declarations: [...COMPONENTS, ...PIPES, ProfileComponent, ChangePasswordComponent],
  entryComponents: [...ENTRY_COMPONENTS , ProfileComponent]
})
export class ThemeModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: ThemeModule,
      providers: [...NB_THEME_PROVIDERS],
    } as ModuleWithProviders;
  }
}

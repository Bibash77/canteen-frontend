import {ModuleWithProviders, NgModule, Optional, SkipSelf} from '@angular/core';
import {CommonModule} from '@angular/common';

import {throwIfAlreadyLoaded} from './module-import-guard';
import {PagingComponent} from './paging/paging.component';
import {NgbPaginationModule} from '@ng-bootstrap/ng-bootstrap';

export const NB_CORE_PROVIDERS = [];

@NgModule({
  imports: [
    CommonModule,
    NgbPaginationModule
  ],
  exports: [],
  declarations: [
    PagingComponent],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: [
        ...NB_CORE_PROVIDERS,
      ],
    } as ModuleWithProviders;
  }
}

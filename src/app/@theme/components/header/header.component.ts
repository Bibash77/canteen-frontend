import {Component, OnDestroy, OnInit} from '@angular/core';
import {NbMediaBreakpointsService, NbSidebarService, NbThemeService} from '@nebular/theme';

import {map, takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {LocalStorageUtil} from '../../../@core/utils/local-storage-util';

@Component({
  selector: 'app-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {

  userPictureOnly = false;
  user: any;
  userId;
  currentTheme = 'default';
  userMenu;
  private destroy$: Subject<void> = new Subject<void>();

  constructor(private sidebarService: NbSidebarService,
              private themeService: NbThemeService,
              private breakpointService: NbMediaBreakpointsService) {
  }

  ngOnInit() {
    this.userId = LocalStorageUtil.getStorage().userId;
    this.userMenu = [{title: 'Profile'}, {title: 'transaction', link: ['/canteen/transaction', this.userId]}, {title: 'Log out' ,
      link: '/canteen/dashboard', }];
    this.currentTheme = this.themeService.currentTheme;

    const {xl} = this.breakpointService.getBreakpointsMap();
    this.themeService.onMediaQueryChange()
    .pipe(
      map(([, currentBreakpoint]) => currentBreakpoint.width < xl),
      takeUntil(this.destroy$),
    )
    .subscribe((isLessThanXl: boolean) => this.userPictureOnly = isLessThanXl);

    this.themeService.onThemeChange()
    .pipe(
      map(({name}) => name),
      takeUntil(this.destroy$),
    )
    .subscribe(themeName => this.currentTheme = themeName);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');

    return false;
  }
}

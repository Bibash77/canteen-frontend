import {Component, OnDestroy, OnInit} from '@angular/core';
import {
  NbDialogService,
  NbMediaBreakpointsService,
  NbMenuService,
  NbSidebarService,
  NbThemeService
} from '@nebular/theme';

import {filter, map, takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {LocalStorageUtil} from '../../../@core/utils/local-storage-util';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ProfileComponent} from './profile-component/profile-component.component';
import {Router} from '@angular/router';
import {SocketService} from "../../../canteen/component/dashboard/notification/socket.service";

@Component({
  selector: 'app-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {

  static LOGOUT = 'Log out';
  static PROFILE = 'Profile';
  userPictureOnly = false;
  user: any;
  userId;
  currentTheme = 'default';
  userMenu;
  contextMenuTag = 'user-context-menu';
  private destroy$: Subject<void> = new Subject<void>();

  constructor(private sidebarService: NbSidebarService,
              private menuService: NbMenuService,
              private dialogService: NbDialogService,
              private router: Router,
              private themeService: NbThemeService,
              private breakpointService: NbMediaBreakpointsService,
              private socketService: SocketService) {
  }

  ngOnInit() {
    this.userId = LocalStorageUtil.getStorage().userId;
    this.user = LocalStorageUtil.getStorage();
    this.userMenu = [{title: 'Profile'}, {title: 'transaction', link: ['/canteen/transaction', this.userId]}, {title: 'Log out' ,
      link: '/canteen/login', }];
    this.headerMenu();
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
    this.setupNotification();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');

    return false;
  }

  headerMenu(): void {
    this.menuService.onItemClick().pipe(
      filter(({tag}) => tag === this.contextMenuTag),
      map(({item: {title}}) => title),
      filter((title) =>
        title === HeaderComponent.LOGOUT ||
        title === HeaderComponent.PROFILE )
    ).subscribe((value) => {
      if (value === HeaderComponent.LOGOUT) {
        LocalStorageUtil.clearStorage();
        this.router.navigate(['/login']);
      } else if (value === HeaderComponent.PROFILE) {
        this.dialogService.open(ProfileComponent);
      }
    });
  }

  setupNotification(): void {
    this.socketService.initializeWebSocketConnection();
  }
}

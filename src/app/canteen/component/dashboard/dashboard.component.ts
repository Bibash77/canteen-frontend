import { Component, OnInit } from '@angular/core';
import {AuthorityUtil} from '../../../@core/utils/AuthorityUtil';
import {LocalStorage, LocalStorageUtil} from '../../../@core/utils/local-storage-util';
import {FormBuilder, FormGroup} from '@angular/forms';
import {SearchDto} from '../modal/SearchDto';
import {Pageable} from '../modal/common-pageable';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
isAdmin: boolean;
isKitchener: boolean;
isStudent: boolean;
  currentDate = new Date();
user;
  searchForm: SearchDto = new SearchDto();
  page = 1;
  spinner = false;
  pageable: Pageable = new Pageable();
  constructor(private formBuilder: FormBuilder) { }
  isFilterCollapsed = true;
  ngOnInit() {
    this.user = LocalStorageUtil.getStorage();
    this.checkAuthority();
    this.setDate();
  }
  checkAuthority() {
    this.isAdmin = AuthorityUtil.checkAdmin();
    this.isKitchener = AuthorityUtil.checkKitchener();
    this.isStudent = AuthorityUtil.checkStudent();
  }
  setDate() {
    const currentDate = new Date();
    currentDate.setDate( currentDate.getDate() - 1);
    this.searchForm.date = JSON.stringify({
      startDate: new Date(currentDate).toLocaleDateString(),
      endDate: new Date(this.currentDate).toLocaleDateString()
    });
  }
}

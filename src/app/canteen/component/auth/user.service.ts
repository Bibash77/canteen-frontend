import { Injectable } from '@angular/core';
import {BaseService} from '../../../@core/BaseService';
import {User} from '../modal/user';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ApiUtils} from '../../../@core/utils/ApiUtils';

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseService<User> {

  static API = `v1/user`;

  constructor(readonly http: HttpClient) {
    super(http);
  }

  protected getApi(): string {
    return UserService.API;
  }

  public registerUser(user: User): Observable<any> {
    const req = ApiUtils.getRequest( `${this.getApi()}/register`);
    return this.http.post(req.url , user , {headers : req.header});
  }

  public changeStatus(user: User): Observable<any> {
    const req = ApiUtils.getRequest( `${this.getApi()}/status`);
    return this.http.post(req.url , user , {headers : req.header});
  }

  public login(user): Observable<any> {
    const req = ApiUtils.getRequest( `${this.getApi()}/login`);
    return this.http.post(req.url, user , {headers : req.header});
  }

  public countUser(startDate: string , endDate: string): Observable<any> {
    const api = `${this.getApi()}/countUser?startDate=${startDate}&endDate=${endDate}`;
    const req = ApiUtils.getRequest(api);
    return this.http.get(req.url, {headers: req.header});
  }
}

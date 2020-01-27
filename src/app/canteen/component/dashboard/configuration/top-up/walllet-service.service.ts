import { Injectable } from '@angular/core';
import {BaseService} from '../../../../../@core/BaseService';
import {Wallet} from '../../../modal/wallet';
import {HttpClient} from '@angular/common/http';
import {ApiUtils} from "../../../../../@core/utils/ApiUtils";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class WallletService extends BaseService<Wallet> {
  static API = `v1/wallet`;

  constructor(readonly http: HttpClient) {
    super(http);
  }

  protected getApi(): string {
    return WallletService.API;
  }

  public topUp(wallet: Wallet): Observable<any> {
    const req = ApiUtils.getRequest(`${this.getApi()}/top-up`);
    return this.http.post(req.url, wallet, {headers: req.header});
  }
}

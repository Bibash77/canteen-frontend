import { Injectable } from '@angular/core';
import {BaseService} from '../../../../../@core/BaseService';
import {Wallet} from '../../../modal/wallet';
import {HttpClient} from '@angular/common/http';
import {ApiUtils} from '../../../../../@core/utils/ApiUtils';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WalletService extends BaseService<Wallet> {
  static API = `v1/wallet`;

  constructor(readonly http: HttpClient) {
    super(http);
  }

  protected getApi(): string {
    return WalletService.API;
  }

  public topUp(wallet: Wallet): Observable<any> {
    const req = ApiUtils.getRequest(`${this.getApi()}/top-up`);
    return this.http.post(req.url, wallet, {headers: req.header});
  }

  // todo put id instead of get all
  public topUpHistory(id): Observable<any> {
    const req = ApiUtils.getRequest(`${this.getApi()}/history/${id}`);
    return this.http.get(req.url, {headers: req.header});
  }

  public countTopUp(startDate: string , endDate: string): Observable<any> {
    const api = `${this.getApi()}/topUpUpCount?startDate=${startDate}&endDate=${endDate}`;
    const req = ApiUtils.getRequest(api);
    return this.http.get(req.url, {headers: req.header});
  }
}

import { Injectable } from '@angular/core';
import {BaseService} from '../../../../@core/BaseService';
import {User} from '../../modal/user';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ConfigService extends BaseService<User> {
  static API = 'v1/user';

  constructor(readonly http: HttpClient) {
    super(http);
  }

  protected getApi(): string {
    return ConfigService.API;
  }
}

import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BaseService} from '../../../../../@core/BaseService';
import {Item} from '../../../modal/Item';

@Injectable({
  providedIn: 'root'
})
export class ItemService extends BaseService<Item> {
  static API = 'v1/item';

  constructor(readonly http: HttpClient) {
    super(http);
  }

  protected getApi(): string {
    return ItemService.API;
  }
}

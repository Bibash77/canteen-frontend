import {ApiConfig} from './ApiConfig';
import {HttpHeaders} from '@angular/common/http';

export class ApiUtils {
  public static getRequest(api: string) {
    const fullApi = `${ApiConfig.URL}/${api}`;
    return {
      url: fullApi,
      header: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
  }
}

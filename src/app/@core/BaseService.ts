import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ApiUtils} from './utils/ApiUtils';

export abstract class BaseService<T> {
protected constructor(protected http: HttpClient) {
}

protected abstract getApi(): string;

public save(obj: T): Observable<any> {
  const req = ApiUtils.getRequest(this.getApi());
  return this.http.post(req.url, obj, {headers: req.header});
}

public getById(id: number): Observable<any> {
  const req = ApiUtils.getRequest(`${this.getApi()}/${id}`);
  return this.http.get(req.url, {headers: req.header});
}

public getAll(): Observable<any> {
const req = ApiUtils.getRequest(`${this.getApi()}/all`);
return this.http.get(req.url, {headers: req.header});
}

  public getPaginationWithSearchObject(searchObj: any, page: number = 1, size: number = 20): Observable<any> {
    const req = ApiUtils.getRequest(`${this.getApi()}/list?page=${page}&size=${size}`);

    return this.http.post(req.url, searchObj, {headers: req.header});
  }
}

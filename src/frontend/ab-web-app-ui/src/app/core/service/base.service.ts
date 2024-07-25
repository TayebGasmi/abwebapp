import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {IBaseService} from "./base.service.interface";
import {PageData} from "../models/page-data";
import {PageLink} from "../models/page-link";

export class BaseService<T, I> implements IBaseService<T, I> {


  constructor(private httpClient: HttpClient, private url: string) {

  }

  updateById(t: T, id: I): Observable<T> {
    return this.httpClient.patch<T>(`${this.url}/${id}`, t);
  }

  findById(id: I): Observable<T> {
    return this.httpClient.get<T>(`${this.url}/${id}`);
  }

  deleteAll(t: T[]): Observable<void> {
    return this.httpClient.put<void>(`${this.url}/delete`, {body: t});
  }

  deleteById(id: I): Observable<void> {
    return this.httpClient.delete<void>(`${this.url}/${id}`)
  }

  findAll(pageLink: PageLink): Observable<PageData<T>> {
    return this.httpClient.post<PageData<T>>(`${this.url}/find`, pageLink);
  }

  save(t: T): Observable<T> {
    return this.httpClient.post<T>(`${this.url}`, t)
  }


}

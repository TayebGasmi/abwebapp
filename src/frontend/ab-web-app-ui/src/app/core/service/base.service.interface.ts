import {BehaviorSubject, Observable} from "rxjs";
import {PageData} from "../models/page-data";
import {PageLink} from "../models/page-link";

export interface IBaseService<T, I> {
  dataSubject$: BehaviorSubject<T | null>
  data$: Observable<T | null>;

  findById(id: I): Observable<T>;

  save(t: T): Observable<T>;

  updateById(t: T, id: I): Observable<T>;

  deleteById(id: I): Observable<void>;

  deleteAll(t: T[]): Observable<void>;

  findAll(pageLink:PageLink): Observable<PageData<T>>;

  updateData(t?: T | null): void


}

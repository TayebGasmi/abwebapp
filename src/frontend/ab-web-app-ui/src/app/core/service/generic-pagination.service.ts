import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {PaginationRequest} from "../models/pagination-request.model";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class GenericPaginationService {

  constructor(private http: HttpClient) { }

  getPaginatedData<T>(url: string, paginationRequest: PaginationRequest): Observable<T> {
    return this.http.post<T>(url, paginationRequest);
  }
}

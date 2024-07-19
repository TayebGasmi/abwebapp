import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {GenericPaginationService} from "./generic-pagination.service";
import {PaginationRequest} from "../models/pagination-request.model";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  private baseUrl: string = `${environment.APPOINTMENT_BOOKING_URL}/session`; // Adjust API URL

  constructor(private genericPaginationService: GenericPaginationService) { }

  getSessions(paginationRequest: PaginationRequest): Observable<any> {
    return this.genericPaginationService.getPaginatedData<any>(`${this.baseUrl}/find`, paginationRequest);
  }
}

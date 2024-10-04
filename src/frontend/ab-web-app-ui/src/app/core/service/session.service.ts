import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {BaseService} from "./base.service";
import {HttpClient} from "@angular/common/http";
import {SessionDto} from "../models/session";
import {Observable} from 'rxjs';
import {PageLink} from "../models/page-link";
import {PageData} from "../models/page-data";

const baseUrl = environment.APPOINTMENT_BOOKING_URL;

@Injectable({
  providedIn: 'root'
})
export class SessionService extends BaseService<SessionDto, number> {

  constructor(private http: HttpClient) {
    const url = `${baseUrl}/session`;
    super(http, url);
  }

  getCurrentUserSessionByDateRange(startDate: string, endDate: string): Observable<SessionDto[]> {
    return this.http.get<SessionDto[]>(`${baseUrl}/session/current`, {
      params: {
        startDate: startDate,
        endDate: endDate
      }
    });
  }

  cancelSession(id: number): Observable<SessionDto> {
    return this.http.patch<SessionDto>(`${baseUrl}/session/cancel/${id}`, null);
  }

  getCurrentUserSession(pageLink: PageLink): Observable<PageData<SessionDto>> {
    return this.http.post<PageData<SessionDto>>(`${baseUrl}/session/current`, pageLink)
  }
}

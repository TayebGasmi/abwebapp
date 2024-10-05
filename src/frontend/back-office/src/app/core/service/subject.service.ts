import {Injectable} from '@angular/core';
import {Subject} from "../models/subject";
import {BaseService} from "./base.service";
import {HttpClient, HttpParams} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";

const baseUrl = environment.APPOINTMENT_BOOKING_URL;

@Injectable({
  providedIn: 'root'
})
export class SubjectService extends BaseService<Subject, number> {

  constructor(private http: HttpClient) {
    const url = `${baseUrl}/subject`;
    super(http, url);
  }

  getCurrentUserSubject(): Observable<Subject[]> {
    return this.http.get<Subject[]>(`${baseUrl}/subject/current`);
  }

  getBySchool(schoolType: string, schoolYear: string): Observable<Subject[]> {
    const params = new HttpParams()
    params.set("year", schoolYear)
    params.set("type", schoolType)
    return this.http.get<Subject[]>(`${baseUrl}/subject/school`, {
      params
    });
  }
}

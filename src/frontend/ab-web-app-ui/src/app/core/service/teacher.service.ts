import {Injectable} from '@angular/core';
import {BaseService} from "./base.service";
import {Teacher} from "../models/teacher";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";

const baseUrl = environment.APPOINTMENT_BOOKING_URL;

@Injectable({
  providedIn: 'root'
})
export class TeacherService extends BaseService<Teacher, number> {

  constructor(private http: HttpClient) {
    const url = `${baseUrl}/teacher`;
    super(http, url);
  }
  getTeachersBySubjectName(subjectName: string): Observable<Teacher[]> {
    return this.http.get<Teacher[]>(`${baseUrl}/teacher/subject/${subjectName}`);
  }
}

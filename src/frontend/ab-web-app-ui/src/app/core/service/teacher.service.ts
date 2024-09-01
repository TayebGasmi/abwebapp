import {inject, Injectable} from '@angular/core';
import {BaseService} from "./base.service";
import {Teacher} from "../models/teacher";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {AuthService} from "./auth.service";
import {BrowserStorageService} from "./browser-storage.service";
import {map, Observable} from "rxjs";
import {Router} from "@angular/router";
import {NotificationService} from "./notification.service";

const baseUrl = environment.APPOINTMENT_BOOKING_URL;

@Injectable({
  providedIn: 'root'
})
export class TeacherService extends BaseService<Teacher, number> {

  constructor(private http: HttpClient) {
  authService = inject(AuthService);
  browserStorage:BrowserStorageService =inject(BrowserStorageService);
  notificationService:NotificationService=inject(NotificationService)
  router:Router= inject(Router)
  teacher!:Teacher ;
  constructor(http: HttpClient) {
    const url = `${baseUrl}/teacher`;
    super(http, url);
  }
  getTeachersBySubjectName(subjectName: string): Observable<Teacher[]> {
    return this.http.get<Teacher[]>(`${baseUrl}/teacher/subject/${subjectName}`);
  }

  isConfirmedByAdmin(): Observable<boolean> {

    return this.findById(JSON.parse(<string>this.browserStorage?.getItem("user"))["id"]).pipe(
      map(teacher => {
        if(!teacher.confirmedByAdmin){
          this.router.navigate(['/auth/login'])
          this.notificationService.showWarn("your account should be confimed by admin")
        }
        return !!teacher?.confirmedByAdmin
        }
      )
    )

  }
}

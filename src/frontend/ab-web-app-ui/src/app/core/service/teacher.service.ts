import {inject, Injectable} from '@angular/core';
import {BaseService} from "./base.service";
import {Teacher} from "../models/teacher";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {AuthService} from "./auth.service";
import {BrowserStorageService} from "./browser-storage.service";
import {map, Observable} from "rxjs";

const baseUrl = environment.APPOINTMENT_BOOKING_URL;

@Injectable({
  providedIn: 'root'
})
export class TeacherService extends BaseService<Teacher, number> {
  authService = inject(AuthService);
  browserStorage:BrowserStorageService =inject(BrowserStorageService);
  teacher!:Teacher ;
  constructor(http: HttpClient) {
    const url = `${baseUrl}/teacher`;
    super(http, url);
  }

  isConfirmedByAdmin(): Observable<boolean> {

    return this.findById(JSON.parse(<string>this.browserStorage?.getItem("user"))["id"]).pipe(
      map(teacher => {
          return !!teacher?.confirmedByAdmin
        }
      )
    )

  }
}

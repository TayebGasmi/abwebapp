import {Injectable} from '@angular/core';
import {BaseService} from "./base.service";
import {Teacher} from "../models/teacher";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";

const baseUrl = environment.APPOINTMENT_BOOKING_URL;

@Injectable({
  providedIn: 'root'
})
export class TeacherService extends BaseService<Teacher, number> {

  constructor(http: HttpClient) {
    const url = `${baseUrl}/teacher`;
    super(http, url);
  }
}

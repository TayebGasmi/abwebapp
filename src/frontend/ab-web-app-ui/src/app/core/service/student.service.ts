import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {BaseService} from "./base.service";
import {Student} from "../models/Student";
const baseUrl = environment.APPOINTMENT_BOOKING_URL;
@Injectable({
  providedIn: 'root'
})
export class StudentService extends BaseService<Student, number>{

  constructor(http:HttpClient) {
    const url = `${baseUrl}/student`;
    super(http, url);
  }
}

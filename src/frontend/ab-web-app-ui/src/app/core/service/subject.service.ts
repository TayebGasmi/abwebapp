import {Injectable} from '@angular/core';
import {Subject} from "../models/subject";
import {BaseService} from "./base.service";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";

const baseUrl = environment.APPOINTMENT_BOOKING_URL;

@Injectable({
  providedIn: 'root'
})
export class SubjectService extends BaseService<Subject, number> {

  constructor(private http: HttpClient) {
    const url = `${baseUrl}/subject`;
    super(http, url);
  }
}

import {Injectable} from '@angular/core';
import {BaseService} from "./base.service";
import {SchoolYear} from "../models/school-year";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";

const baseUrl = environment.APPOINTMENT_BOOKING_URL;

@Injectable({
  providedIn: 'root'
})
export class SchoolYearService extends BaseService<SchoolYear, number> {

  constructor(private http: HttpClient) {
    const url = `${baseUrl}/school-year`;
    super(http, url);
  }
}

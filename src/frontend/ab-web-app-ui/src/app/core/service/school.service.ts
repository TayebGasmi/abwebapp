import { Injectable } from '@angular/core';
import {BaseService} from "./base.service";
import {School} from "../models/School";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {SchoolType} from "../models/SchoolType";
const baseUrl = environment.APPOINTMENT_BOOKING_URL;
@Injectable({
  providedIn: 'root'
})
export class SchoolService extends BaseService<SchoolType, number>{

  constructor(private http: HttpClient) {
    const url = `${baseUrl}/schooltype`;
    super(http, url);
  }
}

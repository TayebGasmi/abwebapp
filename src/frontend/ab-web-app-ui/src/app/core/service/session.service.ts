import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {BaseService} from "./base.service";
import {HttpClient} from "@angular/common/http";
import {SessionDto} from "../models/session";

const baseUrl = environment.APPOINTMENT_BOOKING_URL;

@Injectable({
  providedIn: 'root'
})
export class SessionService extends BaseService<SessionDto, number> {

  constructor(private http: HttpClient) {
    const url = `${baseUrl}/session`;
    super(http, url);
  }
}

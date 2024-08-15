import {Injectable} from '@angular/core';
import {BaseService} from "./base.service";
import {Config} from "../models/config";
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";

const baseUrl = environment.APPOINTMENT_BOOKING_URL;

@Injectable({
  providedIn: 'root'
})
export class ConfigService extends BaseService<Config, number> {

  constructor(private http: HttpClient) {
    const url = `${baseUrl}/config`;
    super(http, url);
  }
}

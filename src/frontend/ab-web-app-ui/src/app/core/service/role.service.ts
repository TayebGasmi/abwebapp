import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {BaseService} from "./base.service";
import {Role} from "../models/role";
import {Injectable} from "@angular/core";
const baseUrl = environment.APPOINTMENT_BOOKING_URL;

@Injectable({
  providedIn: 'root'
})

export class RoleService extends BaseService<Role, number> {

  constructor(private http: HttpClient) {
    const url = `${baseUrl}/role`;
    super(http, url);
  }
}

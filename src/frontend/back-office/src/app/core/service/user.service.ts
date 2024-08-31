import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../models/user";
import {BaseService} from "./base.service";

const baseUrl = environment.APPOINTMENT_BOOKING_URL;

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseService<User, number> {
  private readonly USER_URL = `${environment.APPOINTMENT_BOOKING_URL}/user`;

  constructor(private http: HttpClient) {
    const url = `${baseUrl}/user`;
    super(http, url);
  }

  verifyUserEmail(mail: string, code: string): Observable<any> {
    const encodedMail = encodeURIComponent(mail);
    const encodedCode = encodeURIComponent(code);
    console.log(`${this.USER_URL}/verify?email=${encodedMail}&code=${encodedCode}`);
    return this.http.get<any>(`${this.USER_URL}/verify?email=${encodedMail}&code=${encodedCode}`);

  }

  getUserDetails(): Observable<User> {
    return this.http.get<User>(`${this.USER_URL}/details`);
  }
}

import {inject, Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../models/User";
import {BaseService} from "./base.service";
const baseUrl = environment.APPOINTMENT_BOOKING_URL;
@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseService<User, number>{
  private readonly USER_URL = `${environment.APPOINTMENT_BOOKING_URL}/users`;

  constructor(private http: HttpClient) {
    const url = `${baseUrl}/users`;
    super(http, url);
  }

  verifyUserEmail(mail:string,code:string):Observable<any>{
    const encodedMail = encodeURIComponent(mail);
    const encodedCode = encodeURIComponent(code);
    console.log(`${this.USER_URL}/verify?email=${encodedMail}&code=${encodedCode}`);
    return this.http.get<any>(`${this.USER_URL}/verify?email=${encodedMail}&code=${encodedCode}`);

  }
  getUserDetails():Observable<User>{
    return this.http.get<User>(`${this.USER_URL}/details`);
  }
}

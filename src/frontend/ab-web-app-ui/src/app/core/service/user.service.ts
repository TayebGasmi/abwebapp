import {inject, Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly USER_URL = `${environment.APPOINTMENT_BOOKING_URL}/users`;
  private readonly httpClient: HttpClient = inject(HttpClient);

  constructor() { }

  verifyUserEmail(mail:string,code:string){
    const encodedMail = encodeURIComponent(mail);
    const encodedCode = encodeURIComponent(code);
    console.log(`${this.USER_URL}/verify?email=${encodedMail}&code=${encodedCode}`);
    return this.httpClient.get<any>(`${this.USER_URL}/verify?email=${encodedMail}&code=${encodedCode}`);

  }
}

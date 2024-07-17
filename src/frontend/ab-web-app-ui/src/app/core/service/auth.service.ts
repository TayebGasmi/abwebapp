import {inject, Injectable} from "@angular/core";
import {BehaviorSubject, Observable, tap} from "rxjs";
import {SocialUser} from "@abacritt/angularx-social-login";
import {Router} from "@angular/router";
import {environment} from "../../../environments/environment";
import {Login} from "../models/login";
import {HttpClient} from "@angular/common/http";
import {Register} from "../models/register";
import {SocialLogin} from "../models/SocialLogin";
import {TokenResponse} from "../models/TokenResponse";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly AUTH_URL = `${environment.APPOINTMENT_BOOKING_URL}/auth`;
  private readonly currentUser: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  currentUser$ = this.currentUser.asObservable();
  private readonly router = inject(Router);
  private readonly httpClient: HttpClient = inject(HttpClient);

  nextUser(user: any) {
    this.currentUser.next(user);
  }
  loginSocial(socialAccount:SocialLogin):Observable<TokenResponse>{
    return this.httpClient.post<TokenResponse>(`${this.AUTH_URL}/googlelogin`,socialAccount).pipe(
      tap ((tokenResponse)=>{
        localStorage.setItem('token',JSON.stringify(tokenResponse))
      })
    )
  }


  signBack(login: Login): Observable<any> {
    return this.httpClient.post<any>(this.AUTH_URL, login)
  }

  signUp(register: Register): Observable<any> {
    return this.httpClient.post<any>(`${this.AUTH_URL}/register`, register)
  }


}

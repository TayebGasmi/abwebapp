import {inject, Injectable} from "@angular/core";
import {BehaviorSubject, Observable} from "rxjs";
import {SocialUser} from "@abacritt/angularx-social-login";
import {Router} from "@angular/router";
import {environment} from "../../../environments/environment";
import {Login} from "../models/login";
import {HttpClient} from "@angular/common/http";
import {Register} from "../models/register";

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

  login(user: SocialUser) {
    if (user.provider == 'MICROSOFT') {
      this.signInWithOutlook(user);

    }
    if (user.provider == 'GOOGLE') {
      this.googleLogin(user);
      localStorage.setItem("token", user.idToken)
      localStorage.setItem("pic", user.photoUrl)
      localStorage.setItem("firaslastname", user.firstName + " " + user.lastName)
    }
    this.router.navigate(['']);
  }

  googleLogin(user: SocialUser) {

  }

  signBack(login: Login): Observable<any> {
    return this.httpClient.post<any>(this.AUTH_URL, login)
  }

  signupBack(register: Register): Observable<any> {
    return this.httpClient.post<any>(this.AUTH_URL, register)
  }

  private signInWithOutlook(user: SocialUser) {

  }
}

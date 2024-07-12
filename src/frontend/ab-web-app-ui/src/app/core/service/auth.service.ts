import {inject, Injectable} from "@angular/core";
import {BehaviorSubject, Observable} from "rxjs";
import {SocialUser} from "@abacritt/angularx-social-login";
import {Router} from "@angular/router";
import {environment} from "../../../environments/environment";
import {Login} from "../../shared/DTO/login";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Register} from "../../shared/DTO/register";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly APPOINTMENT_BOOKING_URL = environment.APPOINTMENT_BOOKING_URL;
  private readonly currentUser: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  private readonly router=inject(Router);
  private readonly httpClient :HttpClient =inject(HttpClient);
  currentUser$ = this.currentUser.asObservable();

  nextUser(user: any) {
    this.currentUser.next(user);
  }

  login(user:SocialUser){
    if (user.provider == 'MICROSOFT') {
      this.signInWithOutlook(user);

    }
    if(user.provider == 'GOOGLE'){
      this.googleLogin(user);
      localStorage.setItem("token",user.idToken)
      localStorage.setItem("pic",user.photoUrl)
      localStorage.setItem("firaslastname",user.firstName+" "+user.lastName)
    }
    this.router.navigate(['']);
  }

  googleLogin(user:SocialUser){

  }

  private signInWithOutlook(user: SocialUser) {

  }
   signBack(login:Login): Observable<any>{
    return this.httpClient.post<any>("http://localhost:8080//appointment-booking//authenticate",login)
  }
  signupBack(register:Register):Observable<any>{
    return this.httpClient.post<any>(this.APPOINTMENT_BOOKING_URL+"/users",register)
  }
}

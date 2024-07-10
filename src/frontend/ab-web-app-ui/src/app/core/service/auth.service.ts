import {inject, Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs";
import {SocialUser} from "@abacritt/angularx-social-login";
import {Router} from "@angular/router";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  private readonly APPOINTMENT_BOOKING_URL = environment.APPOINTMENT_BOOKING_URL;
  private readonly currentUser: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  private readonly router=inject(Router);
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
    }
    this.router.navigate(['']);
  }

  googleLogin(user:SocialUser){


  }

  private signInWithOutlook(user: SocialUser) {

  }
}

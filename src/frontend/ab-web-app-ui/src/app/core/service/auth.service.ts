import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs";
import {SocialUser} from "@abacritt/angularx-social-login";

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  private readonly API_URL = 'http://localhost:8O8O/api/auth';
  private readonly currentUser: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  currentUser$ = this.currentUser.asObservable();

  nextUser(user: any) {
    this.currentUser.next(user);
  }

  login(user:SocialUser){
    if(user.provider == 'GOOGLE'){
      this.googleLogin(user);
    }
  }

  googleLogin(user:SocialUser){
    console.log(user);
  }
}

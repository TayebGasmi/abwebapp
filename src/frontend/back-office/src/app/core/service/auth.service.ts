import {inject, Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';
import {environment} from '../../../environments/environment';
import {Login} from '../models/login';
import {HttpClient} from '@angular/common/http';
import {Register} from '../models/register';
import {TokenResponse} from "../models/token-response";
import {BrowserStorageService} from "./browser-storage.service";
import {User} from "../models/user";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly AUTH_URL = `${environment.APPOINTMENT_BOOKING_URL}/auth`;
  private readonly router = inject(Router);
  private readonly httpClient: HttpClient = inject(HttpClient);

  constructor(
    private browserStorage: BrowserStorageService
  ) {
  }

  socialLogin(user: any): Observable<TokenResponse> {
    return this.httpClient.post<TokenResponse>(`${this.AUTH_URL}/social`, user);
  }

  signIn(login: Login): Observable<TokenResponse> {
    return this.httpClient.post<TokenResponse>(`${this.AUTH_URL}/login`, login);
  }

  signUp(register: Register): Observable<void> {
    return this.httpClient.post<void>(`${this.AUTH_URL}/register`, register);
  }

  isAuthenticated(): boolean {
    if (typeof window !== 'undefined' && window.localStorage) {
      const token = this.browserStorage.getItem('access_token');
      return !!token;
    }
    return false;
  }
  setSignout(): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      this.browserStorage.clear();
    }
  }
  hasRoles(roles: string[]): boolean {
    if (roles.length === 0) {
      return true;
    }
    if (typeof window !== 'undefined' && window.localStorage) {
      const userRoles = this.browserStorage.getItem('roles');
      if (userRoles) {
        return roles.some(role => userRoles.includes(role));
      }
    }
    return false;
  }

  logout() {
    this.router.navigate(["/auth/login"]).then(() => this.browserStorage.clear()
    )


  }

  addToken(token: string) {
    if (typeof window !== 'undefined' && window.localStorage) {
      this.browserStorage.setItem('access_token', token);
    }
  }

  addUser(user: User) {
    if (typeof window !== 'undefined' && window.localStorage) {
      this.browserStorage.setItem('user', JSON.stringify(user));
    }
  }

  getAccessToken(): string | null {
    if (typeof window !== 'undefined' && window.localStorage) {
      return this.browserStorage.getItem('access_token');
    }
    return null;
  }

  getUser(): User | null {
    if (typeof window !== 'undefined' && window.localStorage) {
      const userJson = this.browserStorage.getItem('user')
      if (userJson) {
        return JSON.parse(userJson) as User;
      } else {
        // Handle the case where the user is not found (e.g., return a default value or throw an error)
        return null;
      }
    } else {
      return null;
    }
  }

  addRoles(roles: string[]) {
    if (typeof window !== 'undefined' && window.localStorage) {
      this.browserStorage.setItem('roles', JSON.stringify(roles));
    }
  }

  isProfileComplete(): boolean {
    if (typeof window !== 'undefined' && window.localStorage) {
      const userJson = this.browserStorage.getItem('user')
      if (!userJson) {
        return false
      }
      const user = JSON.parse(userJson) as User
      if (!user) {
        return false
      }
      return user?.isCompleted
    }
    return false;
  }
}

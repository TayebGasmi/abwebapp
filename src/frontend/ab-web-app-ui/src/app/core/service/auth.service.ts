import {inject, Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {TokenResponse} from "../models/token-response";
import {BrowserStorageService} from "./browser-storage.service";
import {User} from "../models/user";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly AUTH_URL = `${environment.APPOINTMENT_BOOKING_URL}/auth`;
  private readonly httpClient: HttpClient = inject(HttpClient);

  constructor(
    private browserStorage: BrowserStorageService
  ) {
  }

  socialLogin(user: any): Observable<TokenResponse> {
    return this.httpClient.post<TokenResponse>(`${this.AUTH_URL}/social`, user);
  }

  isAuthenticated(): boolean {
    if (typeof window !== 'undefined' && window.localStorage) {
      const token = this.browserStorage.getItem('access_token');
      return !!token;
    }
    return false;
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
    this.browserStorage.clear();
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

    const userJson = this.browserStorage.getItem('user')
    if (userJson) {
      return JSON.parse(userJson) as User;
    }
    return null
  }


  addRoles(roles
             :
             string[]
  ) {
    if (typeof window !== 'undefined' && window.localStorage) {
      this.browserStorage.setItem('roles', JSON.stringify(roles));
    }
  }

  isProfileComplete()
    :
    boolean {
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

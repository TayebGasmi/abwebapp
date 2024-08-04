import {inject, Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {Router} from '@angular/router';
import {environment} from '../../../environments/environment';
import {Login} from '../models/login';
import {HttpClient} from '@angular/common/http';
import {Register} from '../models/register';
import {TokenResponse} from "../models/TokenResponse";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly AUTH_URL = `${environment.APPOINTMENT_BOOKING_URL}/auth`;
  private readonly router = inject(Router);
  private readonly httpClient: HttpClient = inject(HttpClient);
  private readonly currentUserSubject = new BehaviorSubject<any | null>(null);

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
      const token = localStorage.getItem('access_token');
      return !!token;
    }
    return false;
  }

  logout() {
    localStorage.removeItem('access_token');
    this.router.navigate(['/auth/login']);
  }

  addToken(token: string) {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('access_token', token);
    }
  }

  getAccessToken(): string | null {
    if (typeof window !== 'undefined' && window.localStorage) {
      return localStorage.getItem('access_token');
    }
    return null;
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import {
  Auth,
  UserCredential,
  signInWithEmailAndPassword,
} from '@angular/fire/auth';
import { Observable, timeout, throwError, from } from 'rxjs';
import { environments } from '../../environments/environments';
import { JwtService } from './jwt.service';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _HttpClient: HttpClient = inject(HttpClient);
  private _FirebaseAuth: Auth = inject(Auth);
  private _TokenService: JwtService = inject(JwtService);
  constructor() {
  }

  get isLoggedIn(): boolean {
    return !!this._TokenService.getToken()
  }

  loginWithEmailHandler(
    email: string,
    password: string
  ): Observable<UserCredential> {
    return from(
      signInWithEmailAndPassword(this._FirebaseAuth, email, password)
    );
  }

  getLoginInfo(payload: any): Observable<any> {
    return this._HttpClient
      .post(`${environments.API_URL}/GetLoginInfo`, payload)
      .pipe(
        timeout({
          each: 60000,
          with: () => throwError(() => new Error('Request timed out')),
        })
      );
  }

  logout(): Observable<any> {
    return from(this._FirebaseAuth.signOut());
  }
}

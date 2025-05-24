import {Injectable} from '@angular/core';
import {Observable, Subject, tap} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {jwtDecode} from 'jwt-decode';
import dayjs, {Dayjs} from 'dayjs';
import {USER_ROLES} from '../auth/model/AuthTypes';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly JWT_LS_KEY = 'session_jwt_token';
  private readonly LOGIN_URL = 'login';
  private readonly sessionEvents$ = new Subject<SessionEvent>();

  constructor(private readonly httpClient: HttpClient) {
  }

  getSessionEvents(): Observable<SessionEvent> {
    return this.sessionEvents$;
  }

  login(email: string, password: string): Observable<any> {
    return this.httpClient.post<any>(environment.apiUrl + this.LOGIN_URL, {login: email, password: password})
               .pipe(tap((response: {
                 accessToken: string
               }) => this.setSession(response.accessToken)))
  }

  logout(): void {
    this.clearSession();
  }

  getToken(): string | null {
    return localStorage.getItem(this.JWT_LS_KEY);
  }

  getRoleFromToken(): string {
    return this.extractRoleFromToken();
  }

  isLoggedIn(): boolean {
    const expDate: Dayjs = dayjs.unix(+this.getTokenPayload()?.exp);
    return expDate.isValid() && dayjs().isBefore(expDate);
  }

  private clearSession(): void {
    localStorage.clear();
    this.sessionEvents$.next(SessionEvent.LOGOUT);
  }

  private setSession(token: string): void {
    localStorage.setItem(this.JWT_LS_KEY, token);
    this.sessionEvents$.next(SessionEvent.LOGIN);
    console.log(this.extractRoleFromToken())
  }

  private getTokenPayload(): any {
    if (!this.getToken()) {
      return;
    }
    return jwtDecode(this.getToken()!);
  }

  private extractRoleFromToken(): string {
    return this.getTokenPayload()?.role ?? USER_ROLES.publicUser;
  }
}

export enum SessionEvent {
  LOGIN,
  LOGOUT
}
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly JWT_LS_KEY = 'session_jwt_token';
  private readonly sessionEvents$ = new Subject<SessionEventsType>();

  constructor() {}
}

export const SessionEventsType = {
  login: 'jwt set',
  logout: 'jwt removed',
};

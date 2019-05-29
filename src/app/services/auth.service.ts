import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Http } from '@angular/http';
import { RequestOptions, RequestOptionsArgs, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { User } from '../models/user';
import { UserService } from './user.service';

@Injectable()
export class AuthService {
  private readonly TOKEN_NAME = 'token';
  private readonly USER_ID = 'user_id';

  private loggedInSubject: Subject<User> = new Subject();
  private loggedOutSubject: Subject<any> = new Subject();

  constructor(
    private userService: UserService,
    private http: Http
  ) { }

  public isLoggedIn(): boolean {
    const token: string = this.getTokenFromStorage();

    return null !== token && 'string' === typeof token && '' !== token.trim();
  }

  public verifyUserIsLoggedIn() {
    return this.http.get(environment.api_url + 'auth/login-data', this.addAuthTokenIfHas())
      .catch(error => {
        if ('string' === typeof error) {
          try {
            error = JSON.parse(error);
          } catch (ex) {
            error = {};
          }
        }
        if (!error.ok && 401 === error.status) {
          // user already logged out
          this.removeTokenFromStorage();
        }

        return Observable.throw(error);
      });
  }

  public login(data: any) {
    return new Promise((resolve, reject) => {
      this.http.post(environment.api_url + 'auth/login', data)
        .subscribe(resp => {
          this.addTokenInStorage(resp.json().sessionId);
          this.addUserInStorage(resp.json().userId);

          this.emitUserLoggedInEvent();

          resolve(resp);
        }, error => {
          reject(error);
        });
    });
  }

  public create(data: any) {
    return this.http.post(environment.api_url + 'user', data);
  }

  private emitUserLoggedInEvent() {
    if (!this.isLoggedIn()) {
      return;
    }
    this.userService.getById(this.getLoggedUserId())
      .subscribe(resp => {
        const user = resp.json();

        this.loggedInSubject.next(user);
      });
  }

  public onUserLogged(success?: (value) => void, error?: (error: any) => void, complete?: () => void) {
    return this.loggedInSubject.subscribe(success, error, complete);
  }

  public onUserLoggedOut(success?: (value) => void, error?: (error: any) => void, complete?: () => void) {
    return this.loggedOutSubject.subscribe(success, error, complete);
  }

  public logout() {
    return new Promise((resolve, reject) => {
      this.http.post(environment.api_url + 'auth/logout', this.addAuthTokenIfHas())
        .subscribe(resp => {
          this.handleLoggedOut();

          resolve(true);
        }, error => {
          if (!error.ok && 401 === error.status) {
            // user already logged out
            this.handleLoggedOut();
            resolve(true);

            return;
          }

          reject(error);
        });
    });
  }

  private handleLoggedOut() {
    this.removeTokenFromStorage();
    this.removeUserFromStorage();

    this.loggedOutSubject.next(true);
  }

  private addAuthTokenIfHas(options?: RequestOptionsArgs): RequestOptionsArgs {
    options = options || new RequestOptions();
    options.headers = options.headers || new Headers();

    const token = this.getTokenFromStorage();
    if (token) {
      options.headers.append('X-Auth-Token', token);
    }

    return options;
  }

  private addContentType(options?: RequestOptionsArgs): RequestOptionsArgs {
    options = options || new RequestOptions();
    options.headers = options.headers || new Headers();
    options.headers.append('Content-Type', 'application/json');

    return options;
  }

  public verifyLoggedUser() {
    return this.http.get(environment.api_url + 'auth/login-data');
  }

  public getLoggedUserId() {
    const userData = this.getUserFromStorage();
    if (!userData) {
      return -1;
    }

    return Number.parseInt(userData);
  }

  private removeTokenFromStorage() {
    localStorage.removeItem(this.TOKEN_NAME);
  }

  private addTokenInStorage(token: string) {
    localStorage.setItem(this.TOKEN_NAME, token);
  }

  public getTokenFromStorage() {
    return localStorage.getItem(this.TOKEN_NAME);
  }

  private removeUserFromStorage() {
    localStorage.removeItem(this.USER_ID);
  }

  private addUserInStorage(data: any) {
    localStorage.setItem(this.USER_ID, data);
  }

  public getUserFromStorage() {
    return localStorage.getItem(this.USER_ID);
  }

}

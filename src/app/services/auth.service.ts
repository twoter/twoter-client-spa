import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Http } from '@angular/http';
import { RequestOptions, RequestOptionsArgs, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthService {
  private readonly TOKEN_NAME = 'token';

  constructor(
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

          resolve(resp);
        }, error => {
          reject(error);
        });
    });
  }

  public logout() {
    return new Promise((resolve, reject) => {
      this.http.post(environment.api_url + 'auth/logout', this.addAuthTokenIfHas())
        .subscribe(resp => {
          this.removeTokenFromStorage();
          resolve(true);
        }, error => {
          if (!error.ok && 401 === error.status) {
            // user already logged out
            this.removeTokenFromStorage();
            resolve(true);

            return;
          }

          reject(error);
        });
    });
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

  private removeTokenFromStorage() {
    localStorage.removeItem(this.TOKEN_NAME)
  }

  private addTokenInStorage(token: string) {
    localStorage.setItem(this.TOKEN_NAME, token)
  }

  private getTokenFromStorage() {
    return localStorage.getItem(this.TOKEN_NAME)
  }

}

import { Injectable } from '@angular/core';
import {
  ConnectionBackend,
  XHRBackend,
  RequestOptions,
  Request,
  RequestOptionsArgs,
  Response,
  Http,
  Headers
} from '@angular/http';
// import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

@Injectable()
export class CHttp extends Http {
  constructor(
    backend: ConnectionBackend,
    defaultOptions: RequestOptions
  ) {
    super(backend, defaultOptions);
  }

  get(url: string, options?: RequestOptionsArgs): Observable<Response> {
    return super.get(url, this.addAuthTokenIfHas(options)).catch(this.handleError);
  }

  post(url: string, body: any = {}, options?: RequestOptionsArgs): Observable<Response> {
    return super.post(url, body, this.addAuthTokenIfHas(options)).catch(this.handleError);
  }

  put(url: string, body: any = {}, options?: RequestOptionsArgs): Observable<Response> {
    return super.put(url, body, this.addAuthTokenIfHas(options)).catch(this.handleError);
  }

  delete(url: string, options?: RequestOptionsArgs): Observable<Response> {
    return super.delete(url, this.addAuthTokenIfHas(options)).catch(this.handleError);
  }

  private addAuthTokenIfHas(options?: RequestOptionsArgs): RequestOptionsArgs {
    options = options || new RequestOptions();
    options.headers = options.headers || new Headers();

    const token = this.getStoredAuthToken();
    if (token) {
      options.headers.append('X-Auth-Token', token);
    }

    return options;
  }

  private getStoredAuthToken() {
    const token = localStorage.getItem('token');

    return token;
  }

  private handleError(error: any) {
    const errorStatus = error.status;
    if ('string' === typeof error) {
      try {
        error = JSON.parse(error);
      } catch (ex) {
        error = {};
      }
    }
    if (401 === errorStatus) {
      window.location.href = '/login';
      localStorage.removeItem('token');
    } else {
      try {
        error = JSON.parse(error._body);
        error.status = errorStatus;
      } catch (ex) { }
    }
    console.error(JSON.stringify(error));

    return Observable.throw(error);
  }
}

export function customHttpFactory(xhrBackend: XHRBackend, requestOptions: RequestOptions): Http {
  return new CHttp(xhrBackend, requestOptions);
}

export let customHttpProvider = {
  provide: CHttp,
  useFactory: customHttpFactory,
  deps: [XHRBackend, RequestOptions]
};

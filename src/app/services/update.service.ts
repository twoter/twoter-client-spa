import { Injectable } from '@angular/core';
import { CHttp } from '../common/services/chttp.service';
import { environment } from '../../environments/environment';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

@Injectable()
export class UpdateService {

  private addUpdateSubject: Subject<any> = new Subject();
  private resetUpdates: Subject<any> = new Subject();
  private doLoadUpdates: Subject<any> = new Subject();

  constructor(private http: CHttp) { }

  public getUpdates(page?: number) {
    const params: any = {};
    if (0 < page) {
      params.page = page;
    }
    return this.http.get(environment.api_url + 'update/list', {
      params: params
    });
  }

  public getUpdatesForUser(userId: number, page?: number) {
    const params: any = {};
    if (0 < page) {
      params.page = page;
    }
    return this.http.get(environment.api_url + 'update/list/user/' + userId, {
      params: params
    });
  }

  public searchUpdates(query: string, page?: number) {
    if (!query) {
      return this.getNoResultsResponse();
    }
    if (0 === query.indexOf('#')) {
      query = query.substring(1, query.length);
    }
    if ('' === query.trim()) {
      return this.getNoResultsResponse();
    }

    const params: any = {};
    if (0 < page) {
      params.page = page;
    }
    const url = environment.api_url + 'update/list/tag/' + encodeURIComponent(query);

    return this.http.get(url, {
      params: params
    });
  }

  private getNoResultsResponse() {
    return new Observable((observer) => {
      observer.next({
        json() {
          return [];
        }
      });
      observer.complete();
    });
  }

  public createUpdate(data: { content: string }) {
    return this.http.post(environment.api_url + 'update', data);
  }

  public likeUpdate(updateId: number) {
    return this.http.put(environment.api_url + 'update/like/' + updateId);
  }

  public unlikeUpdate(updateId: number) {
    return this.http.put(environment.api_url + 'update/unlike/' + updateId);
  }

  public addEvent(updateData: any) {
    this.addUpdateSubject.next(updateData);
  }

  public onEventAdded(success?: (value: any) => void, error?: (error: any) => void, complete?: () => void) {
    this.addUpdateSubject.subscribe(success, error, complete);
  }

  public emitResetUpdates() {
    this.resetUpdates.next();
  }

  public onResetUpdates(success?: (value: any) => void, error?: (error: any) => void, complete?: () => void) {
    this.resetUpdates.subscribe(success, error, complete);
  }

  public emitDoLoadUpdates(data: any) {
    this.doLoadUpdates.next(data);
  }

  public onDoLoad(success?: (value: any) => void, error?: (error: any) => void, complete?: () => void) {
    this.doLoadUpdates.subscribe(success, error, complete);
  }

}

import { Injectable } from '@angular/core';
import { CHttp } from '../common/services/chttp.service';
import { environment } from '../../environments/environment';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class UpdateService {

  private addUpdateSubject: Subject<any> = new Subject();

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
    const params: any = { query };
    if (0 < page) {
      params.page = page;
    }
    return this.http.get(environment.api_url + 'update/list', {
      params: params
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

}

import { Injectable } from '@angular/core';
import { CHttp } from '../common/services/chttp.service';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class FollowService {

  private followSubject$: Subject<{userId: number, followed: boolean}> = new Subject();

  constructor(
    private http: CHttp
  ) { }

  public follow(userId: number) {
    return this.http.post(`${this.baseUrl()}/follow/${userId}`)
      .map(resp => {
        if (204 === resp.status) {
          this.followSubject$.next(this.getFollowData(userId, true));
        }

        return resp;
      });
  }

  public unfollow(userId: number) {
    return this.http.post(`${this.baseUrl()}/unfollow/${userId}`)
      .map(resp => {
        if (204 === resp.status) {
          this.followSubject$.next(this.getFollowData(userId, false));
        }

        return resp;
      });
  }

  private getFollowData(userId: number, followed: boolean) {
    return { userId, followed };
  }

  public onFollow(success?: (value: any) => void, error?: (error: any) => void, complete?: () => void) {
    this.followSubject$.subscribe(success, error, complete);
  }

  private baseUrl() {
    return `${environment.api_url}user`;
  }

}

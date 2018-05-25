import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Subject } from 'rxjs/Subject';
import { CHttp } from '../common/services/chttp.service';
import { environment } from '../../environments/environment';

@Injectable()
export class NotificationService {

  private websocket: WebSocket;

  private notificationSubject$: Subject<any> = new Subject();
  private notificationSeeSubject$: Subject<any> = new Subject();

  constructor(
    private http: CHttp,
    private authService: AuthService
  ) {
    if (this.authService.isLoggedIn()) {
      this.connect();
    }

    this.authService.onUserLogged(user => {
      this.connect();
    });
    this.authService.onUserLoggedOut(() => { });
  }

  private connect() {
    this.websocket = new WebSocket(`${environment.notification_url}notification?x-auth-token=${this.authService.getTokenFromStorage()}`);
    this.websocket.onmessage = (event) => {
      this.notificationSubject$.next(event.data);
    }
  }

  public onNotificationReceived(success?: (value) => void, error?: (error: any) => void, complete?: () => void) {
    return this.notificationSubject$.subscribe(success, error, complete);
  }

  public onNotificationSeen(success?: (value) => void, error?: (error: any) => void, complete?: () => void) {
    return this.notificationSeeSubject$.subscribe(success, error, complete);
  }

  public playSound() {
    const audioFile = 'assets/notification.ogg';
    const audio = new Audio(audioFile);
    audio.play();
  }

  public getInfo() {
    return this.http.get(environment.api_url + 'notification/info');
  }

  public see(id: number) {
    return this.http.post(`${environment.api_url}notification/${id}/see`)
      .map(resp => {
        if (204 === resp.status) {
          this.notificationSeeSubject$.next(id);
        }

        return resp;
      });
  }

  public getPaged(page?: number) {
    const params: any = {};
    if (0 < page) {
      params.page = page;
    }

    return this.http.get(`${environment.api_url}notification/list`, {
      params: params
    });
  }

}

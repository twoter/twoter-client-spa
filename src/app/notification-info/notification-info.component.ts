import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../services/notification.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-notification-info',
  templateUrl: './notification-info.component.html',
  styleUrls: ['./notification-info.component.scss']
})
export class NotificationInfoComponent implements OnInit {

  public notSeen: number;
  public loggedIn: boolean;

  constructor(
    private notificationService: NotificationService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    if (this.authService.isLoggedIn()) {
      this.onLoggedIn();
    }
    this.notificationService.onNotificationReceived((data) => {
      this.notSeen++;
      this.notificationService.playSound();
    });
    this.notificationService.onNotificationSeen(() => {
      this.notSeen--;
      if (0 > this.notSeen) {
        this.notSeen = 0;
      }
    });
    this.authService.onUserLogged(user => {
      this.onLoggedIn();
    });
    this.authService.onUserLoggedOut(() => {
      this.loggedIn = false;
    });
  }

  private onLoggedIn() {
    this.loggedIn = true;
    this.getNotifications();
  }

  private getNotifications() {
    this.notificationService.getInfo()
      .subscribe((resp) => {
        this.notSeen = resp.json().notSeenCount;
      });
  }

}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { NotificationService } from '../services/notification.service';
import { NotificationType } from '../models/notification-type';
import { Subscriber } from 'rxjs/Subscriber';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-notification-listing',
  templateUrl: './notification-listing.component.html',
  styleUrls: ['./notification-listing.component.scss']
})
export class NotificationListingComponent implements OnInit, OnDestroy {

  public notifications: any[] = [];
  public loading: boolean;
  private page: number = 1;
  private noMore: boolean;
  private subscribe: Subscription;

  constructor(
    private notificationService: NotificationService
  ) { }

  ngOnInit() {
    this.load();

    this.subscribe = this.notificationService.onNotificationReceived((data) => {
      const jsonData = JSON.parse(data);

      this.notifications.unshift(this.filterNotification(jsonData));
    });
  }

  ngOnDestroy() {
    this.subscribe.unsubscribe();
  }

  private load() {
    if (this.loading || this.noMore) {
      return;
    }

    this.loading = true;
    this.notificationService.getPaged(this.page)
      .subscribe(resp => {
        const jsonResp = resp.json();

        for (const item of jsonResp) {
          this.notifications.push(this.filterNotification(item));
        }
        if (0 === jsonResp.length) {
          this.noMore = true;
        }
        this.loading = false;
        this.page++;
      });
  }

  private filterNotification(data) {
    data.text = this.generateText(data);

    return data;
  }

  private generateText(notification: any): string {
    let text = '';
    switch (notification.type) {
      case NotificationType.UPDATE_LIKE:
        text = 'liked your update';
        break;
      case NotificationType.COMMENT_LIKE:
        text = 'liked your comment';
        break;
      case NotificationType.UPDATE_COMMENT:
        text = 'commented on your update';
        break;
      case NotificationType.UPDATE_POSTED:
        text = 'has posted an update';
        break;
    }

    return `@${notification.from.username} ${text}`;
  }

  public see(item: any) {
    this.notificationService.see(item.id)
      .subscribe(resp => {
        item.seen = true;
      });
  }

}

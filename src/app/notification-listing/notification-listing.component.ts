import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'app-notification-listing',
  templateUrl: './notification-listing.component.html',
  styleUrls: ['./notification-listing.component.scss']
})
export class NotificationListingComponent implements OnInit {

  public notifications: any[] = [];
  public loading: boolean;
  private page: number = 1;
  private noMore: boolean;

  constructor(
    private notificationService: NotificationService
  ) { }

  ngOnInit() {
    this.load();
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
          item.text = this.generateText(item);
          this.notifications.push(item);
        }
        if (0 === jsonResp.length) {
          this.noMore = true;
        }
        this.loading = false;
        this.page++;
      });
  }

  private generateText(notification: any): string {
    let action = '';
    switch (notification.type) {
      case 'UPDATE_LIKE':
      case 'COMMENT_LIKE':
        action = 'liked';
        break;
      case 'UPDATE_COMMENT':
        action = 'commented';
        break;
    }
    let target = '';
    switch (notification.type) {
      case 'UPDATE_LIKE':
      case 'UPDATE_COMMENT':
        target = 'update';
        break;
      case 'COMMENT_LIKE':
        target = 'comment';
        break;
    }
    const s = `@${notification.from.username} ${action} your ${target}`;

    return s;
  }

  public see(item: any) {
    this.notificationService.see(item.id)
      .subscribe(resp => {
        item.seen = true;
      });
  }

}

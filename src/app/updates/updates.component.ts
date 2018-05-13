import { Component, Input, OnInit } from '@angular/core';
import { UpdateService } from '../services/update.service';
import { AuthService } from '../services/auth.service';
import { ImageService } from '../services/image.service';
import { ScrollService } from '../services/scroll.service';
import { Subscription } from 'rxjs/Subscription';
import { OnChanges } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'app-updates',
  templateUrl: './updates.component.html',
  styleUrls: ['./updates.component.css']
})
export class UpdatesComponent implements OnInit {
  @Input() public userId;
  @Input() public tag;
  public updates: any[] = [];
  private page: number = 1;
  private loadingUpdates: boolean;
  private noMoreUpdates: boolean = false;

  private scrollSubscription: Subscription;

  constructor(
    private updateService: UpdateService,
    private authService: AuthService,
    private imageService: ImageService,
    private scrollService: ScrollService
  ) { }

  ngOnInit() {
    this.resetState();
    this.loadUpdates();
    this.initScrollService();

    this.updateService.onEventAdded((resp) => {
      this.updates.unshift(resp);
    });

    this.updateService.onResetUpdates(() => {
      this.resetState();
    });

    this.updateService.onDoLoad((data) => {
      switch (this.getUpdateType()) {
        case UpdateType.tag:
          this.tag = data;
          break;
        case UpdateType.user:
          this.userId = data;
          break;
      }
      this.loadUpdates();
    });
  }

  private resetState() {
    this.page = 1;
    this.noMoreUpdates = false;
    this.updates = [];
  }

  private initScrollService() {
    this.scrollSubscription = this.scrollService.subscribe(resp => {
      if (this.shouldLoadUpdates()) {
        this.loadUpdates();
      }
    });
  }

  private shouldLoadUpdates() {
    return !this.noMoreUpdates && !this.loadingUpdates;
  }

  ngOnDestroy() {
    this.scrollSubscription.unsubscribe();
  }

  public loadUpdates() {
    this.loadingUpdates = true;
    const targetObsearveable = this.getLoadObsearveable();

    targetObsearveable
      .subscribe((resp: any) => {
        this.page++;
        const jsonResp = resp.json();
        for (let i of jsonResp) {
          this.updates.push(i);
        }
        if (0 === jsonResp.length) {
          this.noMoreUpdates = true;
        }

        this.loadingUpdates = false;
      });
  }

  private getLoadObsearveable() {
    const type = this.getUpdateType();
    switch (type) {
      case UpdateType.tag:
        return this.updateService.searchUpdates(this.tag, this.page);
      case UpdateType.user:
        return this.updateService.getUpdatesForUser(this.userId, this.page);
      default:
        return this.updateService.getUpdates(this.page);
    }
  }

  private getUpdateType(): UpdateType {
    if (this.isValidTag()) {
      return UpdateType.tag;
    } else if (this.isValidUserId()) {
      return UpdateType.user;
    }

    return UpdateType.default;
  }

  private isValidTag() {
    return 'string' === typeof this.tag && '' !== this.tag.trim();
  }

  private isValidUserId() {
    return Boolean(this.userId);
  }

}

enum UpdateType {
  user = "USER",
  tag = "TAG",
  default = "DEFAULT"
}

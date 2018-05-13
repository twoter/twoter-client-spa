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
    this.loadUpdates();
    this.initScrollService();

    this.updateService.onEventAdded((resp) => {
      this.updates.unshift(resp);
    });
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
    const targetObsearveable = this.userId ?
      this.updateService.getUpdatesForUser(this.userId, this.page) :
      this.updateService.getUpdates(this.page);

    targetObsearveable
      .subscribe(resp => {
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

}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { UpdateService } from '../services/update.service';
import { ScrollService } from '../services/scroll.service';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  public updates: any[] = [];
  private page: number = 1;
  private loadingUpdates: boolean;

  private scrollSubscription: Subscription;

  constructor(
    private updateService: UpdateService,
    private scrollService: ScrollService
  ) { }

  ngOnInit() {
    this.loadUpdates();

    this.initScrollService();
  }

  private initScrollService() {
    this.scrollSubscription = this.scrollService.subscribe(resp => {
      if (!this.loadingUpdates) {
        this.loadUpdates();
      }
    });
  }

  ngOnDestroy() {
    this.scrollSubscription.unsubscribe();
  }

  public loadUpdates() {
    this.loadingUpdates = true;
    this.updateService.getUpdates(this.page)
    .subscribe(resp => {
      this.page++;
      const jsonResp = resp.json();
      for (let i of jsonResp) {
        this.updates.push(i);
      }

      this.loadingUpdates = false;
    });
  }

  public updatePosted(value) {
    this.updates.unshift(value);
  }

}

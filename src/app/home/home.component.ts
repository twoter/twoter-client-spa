import { Component, OnInit } from '@angular/core';
import { UpdateService } from '../services/update.service';
import { ScrollService } from '../services/scroll.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public updates: any[] = [];
  private page: number = 1;
  private loadingUpdates: boolean;

  constructor(
    private updateService: UpdateService,
    private scrollService: ScrollService
  ) { }

  ngOnInit() {
    this.loadUpdates();

    this.scrollService.subscribe(resp => {
      if (!this.loadingUpdates) {
        this.loadUpdates();
      }
    });
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

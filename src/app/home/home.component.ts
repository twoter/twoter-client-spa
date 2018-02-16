import { Component, OnInit } from '@angular/core';
import { UpdateService } from '../services/update.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public updates: any[] = [];
  private page: number = 1;

  constructor(private updateService: UpdateService) { }

  ngOnInit() {
    this.loadUpdates();
  }

  public loadUpdates() {
    this.updateService.getUpdates(this.page)
    .subscribe(resp => {
      this.page++;
      const jsonResp = resp.json();
      for (let i of jsonResp) {
        this.updates.push(i);
      }
    });
  }

  public updatePosted(value) {
    this.updates.unshift(value);
  }

}

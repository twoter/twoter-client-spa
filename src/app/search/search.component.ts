import { Component, OnInit } from '@angular/core';
import { UpdateService } from '../services/update.service';
import { Params, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  public updates: any[] = [];
  private page: number = 1;
  private loading: boolean;

  constructor(
    private updateService: UpdateService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.activatedRoute.queryParamMap
    .map((params: Params) => params.params)
    .subscribe((params) => {
      const query = params.q;
      this.loadUpdates(query);
    });
  }

  public loadUpdates(query: string) {
    this.loading = true;
    this.updateService.searchUpdates(query, this.page)
    .subscribe(resp => {
      this.page++;
      const jsonResp = resp.json();
      for (let i of jsonResp) {
        this.updates.push(i);
      }

      this.loading = false;
    });
  }

  public updatePosted(value) {
    this.updates.unshift(value);
  }

}

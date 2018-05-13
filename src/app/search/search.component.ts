import { Component, OnInit } from '@angular/core';
import { UpdateService } from '../services/update.service';
import { Params, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  public tag: string;

  constructor(
    private updateService: UpdateService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.activatedRoute.queryParamMap
      .map((params: Params) => params.params)
      .subscribe((params) => {
        this.tag = params.q;
        this.updateService.emitResetUpdates();
        this.updateService.emitDoLoadUpdates(this.tag);
      });
  }

  public updatePosted(value) {
    this.updateService.addEvent(value);
  }

}

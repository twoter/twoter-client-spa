import { Component, OnInit } from '@angular/core';
import { Tag } from '../models/tag';
import { UpdateService } from '../services/update.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-popular-tags',
  templateUrl: './popular-tags.component.html',
  styleUrls: ['./popular-tags.component.scss']
})
export class PopularTagsComponent implements OnInit {

  public popularTags: Tag[];
  public loading: boolean;

  constructor(
    private updateService: UpdateService,
    private router: Router
  ) { }

  ngOnInit() {
    this.loading = true;
    this.updateService.getPopularTags()
      .map((resp) => resp.json())
      .subscribe((resp) => {
        this.popularTags = resp;
      },
      (e) => console.error(e),
      () => {
        this.loading = false;
      }
    );
  }

  public viewTag(tag: string) {
    this.router.navigate(['/search'], {
      queryParams: {
        q: tag
      }
    });

    return false;
  }

}

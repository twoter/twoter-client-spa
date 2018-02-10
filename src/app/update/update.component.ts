import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {
  @Input() public update: any;
  public loading: boolean;
  public showComments: boolean = false;

  constructor() { }

  ngOnInit() {
  }

  public like() {
    return false;
  }

  public comment() {
    this.showComments = true;

    return false;
  }

  get likeText() {
    return (this.update && this.update.liked) ? 'unlike' : 'like';
  }

  get comments() {
    return (this.update && this.update.comments instanceof Array) ? this.update.comments : [];
  }

  get likesCount() {
    return (this.comment && this.update.likes) ? this.update.likes : 0;
  }

  get commentsCount() {
    return (this.comment && this.update.commentsCount) ? this.update.commentsCount : 0;
  }

}

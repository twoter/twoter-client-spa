import { Component, OnInit, Input } from '@angular/core';
import { CommentService } from '../services/comment.service';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {
  @Input() public comment: any;

  constructor(
    private router: Router,
    private commentService: CommentService
  ) { }

  ngOnInit() {
  }

  public like() {
    if (this.comment.liked) {
      this.commentService.unlikeComment(this.comment.id)
        .subscribe(resp => {
          this.comment.liked = false;
          this.comment.likes--;
        });
    } else {
      this.commentService.likeComment(this.comment.id)
        .subscribe(resp => {
          this.comment.liked = true;
          this.comment.likes++;
        });
    }

    return false;
  }

  public viewUser() {
    if (!this.comment.user) {
      return false;
    }
    this.router.navigate(['/user'], {
      queryParams: {
        id: this.comment.user.id
      }
    });

    return false;
  }

  get likes() {
    return (this.comment && this.comment.likes) ? this.comment.likes : 0;
  }

  get likeText() {
    return (this.comment && this.comment.liked) ? 'unlike' : 'like';
  }

  get imageUrl() {
    return `${environment.api_url}image/${this.comment.imageId}/small`;
  }

}

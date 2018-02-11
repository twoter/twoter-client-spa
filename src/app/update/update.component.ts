import { Component, OnInit, Input } from '@angular/core';
import { CommentService } from '../services/comment.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {
  @Input() public update: any;
  public loading: boolean;
  public showComments: boolean = false;
  private commentPage: number = 1;

  constructor(private commentService: CommentService) { }

  ngOnInit() {
  }

  public like() {
    return false;
  }

  public comment() {
    this.commentService.getCommentsForUpdate(this.update.id, this.commentPage)
      .subscribe(resp => {
        this.commentPage++;
        if (!(this.update.comments instanceof Array)) {
          this.update.comments = [];
        }
        const jsonResp = resp.json();
        for (let i of jsonResp) {
          this.update.comments.push(i);
        }
      });
    this.showComments = true;

    return false;
  }

  public commentAdded(commentData: any) {
    this.update.comments.push(commentData);
    this.update.commentsCount++;
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

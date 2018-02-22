import { Component, OnInit, Input } from '@angular/core';
import { CommentService } from '../services/comment.service';
import { UpdateService } from '../services/update.service';

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

  constructor(
    private commentService: CommentService,
    private updateService: UpdateService
  ) { }

  ngOnInit() {
    // console.log(JSON.stringify(this.update, null, 2))
    const tagNames: string[] = [];
    for (let tag of this.update.tags || []) {
      tagNames.push(tag.name);
    }
    this.update.content = this.escapeHtml(this.update.content);
    console.log(JSON.stringify(tagNames, null, 2))
    for (let tag of tagNames) {
      this.update.content = this.update.content.replace(new RegExp('(\#' + tag + ')'), '<a href="#" style="color: green;">$1</a>')
    }
    console.log('CONTENT')
    console.log(this.update.content)
    console.log('--')
  }

  private escapeHtml(text) {
    return text
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  public like() {
    if (this.update.liked) {
      this.updateService.unlikeUpdate(this.update.id)
        .subscribe(resp => {
          this.update.liked = false;
          this.update.likes--;
        });
    } else {
      this.updateService.likeUpdate(this.update.id)
        .subscribe(resp => {
          this.update.liked = true;
          this.update.likes++;
        });
    }

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

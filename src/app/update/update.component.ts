import { Component, OnInit, Input } from '@angular/core';
import { CommentService } from '../services/comment.service';
import { UpdateService } from '../services/update.service';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {
  private readonly commentResultCount = 7;

  @Input() public update: any;
  public loading: boolean;
  public commentsShowing: boolean = false;
  public noMoreComments: boolean = false;
  private commentPage: number = 1;
  private commentsLoading: boolean = false;

  constructor(
    private router: Router,
    private commentService: CommentService,
    private updateService: UpdateService
  ) { }

  ngOnInit() {
    const tagNames: string[] = [];
    for (let tag of this.update.tags || []) {
      tagNames.push(tag.name);
    }
    this.update.content = this.escapeHtml(this.update.content);
    for (let tag of tagNames) {
      this.update.content = this.replaceTagInContent(this.update, tag);
    }
  }

  private replaceTagInContent(update: any, tag: string): string {
    return update.content.replace(new RegExp('(\#' + tag + ')'), '<a class="tag-link" href="#" style="color: green;">$1</a>');
  }

  public tagClick(e) {
    if (this.isLink(e.target)) {
      this.viewTag(e.target.innerHTML);
    }

    return false;
  }

  private isLink(element) {
    return element && 'A' === element.tagName;
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

  public showComments() {
    if (this.commentsShowing) {
      return false;
    }

    this.loadComments();

    return false;
  }

  public loadComments() {
    if (this.commentsLoading) {
      return false;
    }
    this.commentsLoading = true;

    this.commentService.getCommentsForUpdate(this.update.id, this.commentPage)
      .subscribe(resp => {
        this.commentPage++;
        if (!(this.update.comments instanceof Array)) {
          this.update.comments = [];
        }
        const jsonResp = resp.json();
        for (let i of jsonResp) {
          this.update.comments.unshift(i);
        }

        if (this.commentResultCount > jsonResp.length) {
          this.noMoreComments = true;
        }

        this.commentsLoading = false;
      });
    this.commentsShowing = true;
  }

  public commentAdded(commentData: any) {
    this.update.comments.push(commentData);
    this.update.commentsCount++;
  }

  public viewTag(tag: string) {
    this.router.navigate(['/search'], {
      queryParams: {
        q: tag
      }
    });

    return false;
  }

  public viewUser() {
    if (!this.update.user) {
      return false;
    }
    this.router.navigate(['/user'], {
      queryParams: {
        id: this.update.user.id
      }
    });

    return false;
  }

  get likeText() {
    return (this.update && this.update.liked) ? 'unlike' : 'like';
  }

  get comments() {
    return (this.update && this.update.comments instanceof Array) ? this.update.comments : [];
  }

  get likesCount() {
    return (this.update && this.update.likes) ? this.update.likes : 0;
  }

  get commentsCount() {
    return (this.update && this.update.commentsCount) ? this.update.commentsCount : 0;
  }

  get imageUrl() {
    return `${environment.api_url}image/${this.update.imageId}/small`;
  }

}

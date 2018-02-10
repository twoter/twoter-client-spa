import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CommentService } from '../services/comment.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {
  @Input() public updateId: number;
  @Input() public comments: any[];
  @Output() public commentAdded: EventEmitter<any> = new EventEmitter();

  constructor(private commentService: CommentService) { }

  ngOnInit() {
  }

  public createComment(content) {
    console.log(content)
    if ('string' !== typeof content || '' === content.trim()) {
      return;
    }
    this.commentService.createComment({ content: content, updateId: this.updateId })
      .subscribe(resp => {
        const jsonResp = resp.json();
        console.log(JSON.stringify(jsonResp, null, 2));

        this.commentAdded.emit(jsonResp);
      });
  }

}

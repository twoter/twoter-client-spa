import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ViewChild
} from '@angular/core';
import { CommentService } from '../services/comment.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {
  @Input() public updateId: number;
  @Input() public comments: Comment[];
  @Input() public noMoreComments: boolean;
  @Input() public loading: boolean;
  @Output() public commentAdded: EventEmitter<any> = new EventEmitter();
  @Output() public commentLoad: EventEmitter<any> = new EventEmitter();

  @ViewChild('commentInp') input;

  constructor(private commentService: CommentService) { }

  ngOnInit() {
  }

  public createComment(content) {
    if ('string' !== typeof content || '' === content.trim()) {
      return;
    }

    this.commentService.createComment({ content: content, updateId: this.updateId })
      .subscribe(resp => {
        const jsonResp = resp.json();
        this.input.nativeElement.value = '';

        this.commentAdded.emit(jsonResp);
      });
  }

  public loadOlderComments() {
    this.commentLoad.emit();

    return false;
  }

}

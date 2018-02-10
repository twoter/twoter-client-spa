import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
  @Input() public comment: any;

  constructor() { }

  ngOnInit() {
  }

  get likes() {
    return (this.comment && this.comment.likes) ? this.comment.likes : 0;
  }

}

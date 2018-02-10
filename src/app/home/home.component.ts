import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public updates: any[] = [
    {
      id: 1,
      content: 'text1'
    },
    {
      id: 2,
      content: 'text2',
      comments: [
        {
          content: 'comment1'
        },
      ]
    },

  ];

  constructor() { }

  ngOnInit() {
  }

}

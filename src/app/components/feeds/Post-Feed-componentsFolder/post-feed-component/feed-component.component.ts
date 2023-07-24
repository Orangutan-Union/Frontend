import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Like } from 'src/app/models/addLike';
import { Post } from 'src/app/models/post';
import { FeedService } from 'src/app/services/feed.service';

@Component({
  selector: 'app-feed-component',
  templateUrl: './feed-component.component.html',
  styleUrls: ['./feed-component.component.css']
})
export class FeedComponentComponent implements OnInit {
  @Input() posts: Post
  @Input() i: number

  constructor() { }

  ngOnInit(): void {
    //this.counter(this.posts)
    if (this.posts.userId === 2 && this.posts.pictures.length > 0) {
      this.posts.pictures[0].imageUrl = "https://res.cloudinary.com/dm52kqhd4/image/upload/v1688042479/t1htf6u5uc0tsxu1m9bh.png";
    }
  }

}

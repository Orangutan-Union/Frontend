import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Like } from 'src/app/models/addLike';
import { Post } from 'src/app/models/post';
import { FeedService } from 'src/app/services/feed.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {
  posts: Post[] = [];
  userId: number = 0;

  constructor(private feedService: FeedService) { }

  ngOnInit(): void {
    this.getFeed();    
  }
  
  getFeed(): void {
    this.userId = Number(localStorage.getItem('userid'));
    this.feedService.getUserFeed(this.userId).subscribe(data => {
      this.posts = data;
      console.log(this.posts);
    })
  }
}

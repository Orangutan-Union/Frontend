import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { Unsub } from 'src/app/classes/unsub';
import { Like } from 'src/app/models/addLike';
import { Post } from 'src/app/models/post';
import { FeedService } from 'src/app/services/feed.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent extends Unsub implements OnInit {
  posts: Post[] = [];
  userId: number = 0;

  constructor(private feedService: FeedService) { super(); }

  ngOnInit(): void {    
    this.getFeed();    
  }
  
  getFeed(): void {    
    this.userId = Number(localStorage.getItem('userid'));
    this.feedService.getUserFeed(this.userId).pipe(takeUntil(this.unsubscribe$)).subscribe(data => {
      this.posts = data;
      console.log(this.posts);
    })
  }
}

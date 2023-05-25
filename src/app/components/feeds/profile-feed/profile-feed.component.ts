import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Post } from 'src/app/models/post';
import { FeedService } from 'src/app/services/feed.service';

@Component({
  selector: 'app-profile-feed',
  templateUrl: './profile-feed.component.html',
  styleUrls: ['./profile-feed.component.css']
})
export class ProfileFeedComponent implements OnInit {
  posts: Post[] = [];
  userId: number = 0;
  likeCount: number = 0;
  dislikeCount: number = 0;
  likeCounter: number[] = [];
  dislikeCounter: number[] = [];
  constructor(private feedService: FeedService, private route: Router) { }

  ngOnInit(): void {
    this.getUserPosts();
  }

  goToFullPost(id: number) {
    this.route.navigate(['/fullPost/', id])
  }

  goToGroup(id: number) {
    this.route.navigate([])
  }

  getUserPosts(): void {
    this.userId = Number(localStorage.getItem('userid'));
    this.feedService.getUserPosts(this.userId).subscribe(data => {
      this.posts = data;
      this.counter(this.posts);
      console.log(this.posts);
    })
  }

  counter(posts: Post[]): void {
    posts.forEach(element => {
      element.likes.forEach(element => {
        if (element.isLiked == true) { this.likeCount++ }
        if (element.isDisliked == true) { this.dislikeCount++ }
      });

      if (this.likeCount != 0) { this.likeCounter.push(this.likeCount) }
      else { this.likeCounter.push(0) }

      if (this.dislikeCount != 0) { this.dislikeCounter.push(this.dislikeCount) }
      else { this.dislikeCounter.push(0) }
      this.likeCount = 0;
      this.dislikeCount = 0;
    });
  }
}

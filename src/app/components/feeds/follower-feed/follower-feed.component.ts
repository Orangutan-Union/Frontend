import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Like } from 'src/app/models/addLike';
import { Post } from 'src/app/models/post';
import { FeedService } from 'src/app/services/feed.service';
import { takeUntil } from 'rxjs/operators'
import { Unsub } from 'src/app/classes/unsub';

@Component({
  selector: 'app-follower-feed',
  templateUrl: './follower-feed.component.html',
  styleUrls: ['./follower-feed.component.css']
})
export class FollowerFeedComponent extends Unsub implements OnInit {
  posts: Post[] = [];
  like: Like = new Like;
  userId: number = 0;
  commentCount: number = 0;
  likeCount: number = 0;
  dislikeCount: number = 0;
  commentCounter: number[] = [];
  likeCounter: number[] = [];
  dislikeCounter: number[] = [];
  constructor(private feedService: FeedService, private route: Router) { super(); }

  ngOnInit(): void {
    this.getFollowerFeed();    
  }

  likePost(post: Post, i: number): void {
    this.like.userId = Number(localStorage.getItem('userid'));
    this.like.postId = post.postId;
    this.like.isLiked = true;

    post.likes.forEach(element => {
      if (element.userId == this.like.userId && element.postId == post.postId) {
        this.like.isLiked = !element.isLiked
        element.isLiked = this.like.isLiked
        this.like.isDisliked = element.isDisliked;
        element.isDisliked = false
      }
    });

    if (post.likes.filter(x => x.userId === this.like.userId).length === 0) {
      this.likeCounter[i]++
      this.feedService.addLike(this.like).pipe(takeUntil(this.unsubscribe$)).subscribe(data => {
        console.log(data)
        this.getFollowerFeed();
      })
      return;
    }

    if (this.like.isDisliked == true && this.dislikeCounter[i] != 0) {
      this.dislikeCounter[i]--
      this.like.isDisliked = false;
    }

    if (this.like.isLiked == true) {
      this.likeCounter[i]++
    }
    else {
      this.likeCounter[i]--
    }

    this.feedService.addLike(this.like).pipe(takeUntil(this.unsubscribe$)).subscribe(data => {
      console.log(data)
    })
  }

  dislikePost(post: Post, i: number): void {
    this.like.userId = Number(localStorage.getItem('userid'));
    this.like.postId = post.postId;
    this.like.isDisliked = true;

    post.likes.forEach(element => {
      if (element.userId == this.like.userId && element.postId == post.postId) {
        this.like.isDisliked = !element.isDisliked
        element.isDisliked = this.like.isDisliked
        this.like.isLiked = element.isLiked;    
        element.isLiked = false    
      }
    });

    if (post.likes.filter(x => x.userId === this.like.userId).length === 0) {
      this.dislikeCounter[i]++
      this.feedService.addLike(this.like).pipe(takeUntil(this.unsubscribe$)).subscribe(data => {
        console.log(data)
        this.getFollowerFeed();
      })
      return;
    }
    
    if (this.like.isLiked == true && this.likeCounter[i] != 0) {
      this.likeCounter[i]--
      this.like.isLiked = false;
    }   

    if (this.like.isDisliked == true) {
      this.dislikeCounter[i]++

    }
    else {
      this.dislikeCounter[i]--
    }

    this.feedService.addLike(this.like).pipe(takeUntil(this.unsubscribe$)).subscribe(data => {
      console.log(data)
    })
  }

  goToFullPost(id: number) {
    this.route.navigate(['/fullPost/', id])
  }

  goToGroup(groupId: number) {
    this.route.navigate([['/groupHome/', groupId]])
  }

  getFollowerFeed(): void {
    this.userId = Number(localStorage.getItem('userid'));
    this.feedService.getUsersFollowerFeed(this.userId).pipe(takeUntil(this.unsubscribe$)).subscribe(data => {
      this.posts = data;
      this.counter(this.posts);
      console.log(this.posts);
    })
  }

  counter(posts: Post[]): void {
    posts.forEach(post => {
      post.likes.forEach(like => {
        if (like.isLiked == true) { this.likeCount++ }
        if (like.isDisliked == true) { this.dislikeCount++ }
      });
      this.likeCounter.push(this.likeCount);
      this.dislikeCounter.push(this.dislikeCount);
      
      post.comments.forEach(comment => {
        this.commentCount++
      });
      this.commentCounter.push(this.commentCount);

      this.likeCount = 0;
      this.dislikeCount = 0;
      this.commentCount = 0;
    });
  }
}

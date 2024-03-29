import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Like } from 'src/app/models/addLike';
import { Post } from 'src/app/models/post';
import { FeedService } from 'src/app/services/feed.service';
import { takeUntil } from 'rxjs/operators'
import { Unsub } from 'src/app/classes/unsub';

@Component({
  selector: 'app-post-toolbar',
  templateUrl: './post-toolbar.component.html',
  styleUrls: ['./post-toolbar.component.css']
})
export class PostToolbarComponent extends Unsub implements OnInit {
  @Input() posts: Post
  @Input() i: number
  like: Like = new Like;
  userId: number = 0;
  commentCount: number = 0;
  likeCount: number = 0;
  dislikeCount: number = 0;
  commentCounter: number[] = [];
  likeCounter: number[] = [];
  dislikeCounter: number[] = [];
  isLiked: Boolean = false
  isDisliked: Boolean = false
  constructor(private feedService: FeedService, private route: Router) { super(); }

  ngOnInit(): void {
    this.counter(this.posts)
  }

  likePost(post: Post): void {
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
      this.feedService.addLike(this.like).pipe(takeUntil(this.unsubscribe$)).subscribe(data => {
        this.getFeed();
      })
      return;
    }

    if (this.like.isDisliked == true && this.dislikeCount != 0) {
      this.dislikeCount--
      this.like.isDisliked = false;
    }

    if (this.like.isLiked == true) {
      this.likeCount++
      this.isLiked = true
      this.isDisliked = false
    }
    else {
      this.likeCount--
      this.isLiked = false
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
      this.feedService.addLike(this.like).pipe(takeUntil(this.unsubscribe$)).subscribe(data => {
        this.getFeed();
        this.isDisliked = true
        this.isLiked = false

      })
      return;
    }

    if (this.like.isLiked == true && this.likeCounter[i] != 0) {
      this.likeCount--
      this.like.isLiked = false;
    }
    console.log(this.like.isLiked);

    if (this.like.isDisliked == true) {
      this.dislikeCount++
      this.isDisliked = true
      this.isLiked = false

    }
    else {
      this.dislikeCount--
      this.isDisliked = false
    }

    this.feedService.addLike(this.like).pipe(takeUntil(this.unsubscribe$)).subscribe(data => {
      console.log(data)
    })
  }


  goToFullPost(id: number) {
    this.route.navigate(['/fullPost/', id])
  }

  getFeed(): void {
    this.userId = Number(localStorage.getItem('userid'));
    this.feedService.getFullPost(this.posts.postId).pipe(takeUntil(this.unsubscribe$)).subscribe(data => {
      this.posts = data;
      this.counter(this.posts);
      console.log(this.posts);
    })
  }

  counter(posts: Post): void {
    //Reset counters in case the function is called after onInit
    this.likeCount = 0;
    this.dislikeCount = 0;
    this.commentCount = 0;

    posts.likes.forEach(like => {
      if (like.isLiked == true) {
        this.likeCount++
        if (like.userId === Number(localStorage.getItem('userid'))) {
          this.isLiked = true
          this.isDisliked = false
        }
      }
      if (like.isDisliked == true) {
        this.dislikeCount++
        if (like.userId === Number(localStorage.getItem('userid'))) {
          this.isLiked = false
          this.isDisliked = true
        }
      }
    });

    posts.comments.forEach(comment => {
      this.commentCount++
    });
  }
}
